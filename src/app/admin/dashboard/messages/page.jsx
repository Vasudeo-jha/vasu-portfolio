'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Search,
  Trash2,
  Eye,
  Check,
  X,
  MessageSquare,
  Clock,
  User,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        toast.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const viewMessage = async (message) => {
    setSelectedMessage(message);
    setShowModal(true);

    // Mark as read
    if (!message.isRead) {
      try {
        const response = await fetch(`/api/messages/${message.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isRead: true }),
        });

        if (response.ok) {
          setMessages(messages.map(m => 
            m.id === message.id ? { ...m, isRead: true } : m
          ));
        }
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Message deleted');
        setMessages(messages.filter(m => m.id !== id));
        if (selectedMessage?.id === id) {
          setShowModal(false);
          setSelectedMessage(null);
        }
      } else {
        toast.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete message');
    }
  };

  const markAsReplied = async (id) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replied: true }),
      });

      if (response.ok) {
        toast.success('Marked as replied');
        setMessages(messages.map(m => 
          m.id === id ? { ...m, replied: true } : m
        ));
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, replied: true });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update message');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'unread') return matchesSearch && !message.isRead;
    if (filter === 'read') return matchesSearch && message.isRead;
    return matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Messages</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'No unread messages'}
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-white/10 transition-colors text-[var(--text-primary)]"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="glass-card text-center py-12">
          <MessageSquare className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">
            {searchQuery ? 'No messages match your search' : 'No messages yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card cursor-pointer hover:border-blue-500/30 transition-all ${
                !message.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => viewMessage(message)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !message.isRead ? 'bg-blue-500/20' : 'bg-[var(--glass-bg)]'
                  }`}>
                    <User className={`w-5 h-5 ${!message.isRead ? 'text-blue-400' : 'text-[var(--text-secondary)]'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold truncate ${!message.isRead ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                        {message.name}
                      </h3>
                      {message.replied && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                          Replied
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] truncate">{message.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <p className={`text-sm font-medium truncate max-w-[200px] ${!message.isRead ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {message.subject || 'No subject'}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(message.id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Message Modal */}
      <AnimatePresence>
        {showModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--glass-border)] w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--text-primary)]">{selectedMessage.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{selectedMessage.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-[var(--text-secondary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[50vh]">
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">Subject</p>
                  <p className="text-[var(--text-primary)] font-medium">{selectedMessage.subject || 'No subject'}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">Message</p>
                  <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                  {selectedMessage.replied && (
                    <span className="flex items-center gap-1 text-green-400">
                      <Check className="w-4 h-4" />
                      Replied
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-[var(--glass-border)]">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Reply via Email
                </a>
                {!selectedMessage.replied && (
                  <button
                    onClick={() => markAsReplied(selectedMessage.id)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    Mark Replied
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
