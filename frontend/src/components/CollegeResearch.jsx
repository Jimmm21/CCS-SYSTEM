import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  FileText,
  TrendingUp,
  Award,
  Plus,
  Tag,
  Clock,
  X,
  Save,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const researchCategories = [
  'All Categories',
  'Artificial Intelligence',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'Software Engineering'
];

const mockResearch = [
  {
    id: '1',
    title: 'Machine Learning Applications in Student Performance Prediction',
    authors: ['Dr. John Smith', 'Prof. Maria Garcia', 'Dr. Robert Lee'],
    category: 'Artificial Intelligence',
    status: 'Published',
    date: '2024-03-15',
    year: '2024',
    abstract: 'This study explores the use of machine learning algorithms to predict student academic performance based on various factors including attendance, assignment completion, and previous grades.',
    keywords: ['Machine Learning', 'Education', 'Predictive Analytics', 'Student Performance'],
    citations: 45,
    views: 320,
    downloads: 180,
    journal: 'International Journal of Educational Technology',
    doi: '10.1234/ijet.2024.001'
  },
  {
    id: '2',
    title: 'Secure Web Application Development: Best Practices and Frameworks',
    authors: ['Prof. Sarah Johnson', 'Dr. Michael Chen'],
    category: 'Web Development',
    status: 'Published',
    date: '2024-02-20',
    year: '2024',
    abstract: 'A comprehensive analysis of modern web security frameworks and best practices for developing secure web applications in the current threat landscape.',
    keywords: ['Web Security', 'Frameworks', 'Best Practices', 'Cybersecurity'],
    citations: 32,
    views: 280,
    downloads: 150,
    journal: 'Journal of Web Technologies',
    doi: '10.1234/jwt.2024.002'
  },
  {
    id: '3',
    title: 'Mobile App Performance Optimization for Low-End Devices',
    authors: ['Dr. Emily Davis', 'Prof. James Wilson'],
    category: 'Mobile Development',
    status: 'Under Review',
    date: '2024-04-10',
    year: '2024',
    abstract: 'This research focuses on optimization techniques for mobile applications to ensure optimal performance on low-end devices with limited resources.',
    keywords: ['Mobile Development', 'Performance', 'Optimization', 'Low-End Devices'],
    citations: 0,
    views: 95,
    downloads: 45,
    journal: 'Mobile Computing Review',
    doi: 'Pending'
  },
  {
    id: '4',
    title: 'Big Data Analytics in Educational Institutions',
    authors: ['Dr. Patricia Brown', 'Prof. David Martinez'],
    category: 'Data Science',
    status: 'Published',
    date: '2023-11-05',
    year: '2023',
    abstract: 'An exploration of how big data analytics can be leveraged in educational institutions to improve decision-making and student outcomes.',
    keywords: ['Big Data', 'Analytics', 'Education', 'Data Mining'],
    citations: 67,
    views: 450,
    downloads: 220,
    journal: 'Data Science in Education',
    doi: '10.1234/dse.2023.003'
  },
  {
    id: '5',
    title: 'Cloud-Based Learning Management System Architecture',
    authors: ['Prof. Lisa Anderson', 'Dr. Mark Thompson'],
    category: 'Cloud Computing',
    status: 'Published',
    date: '2023-09-18',
    year: '2023',
    abstract: 'Design and implementation of a scalable cloud-based learning management system using modern cloud technologies.',
    keywords: ['Cloud Computing', 'LMS', 'Architecture', 'Scalability'],
    citations: 28,
    views: 310,
    downloads: 175,
    journal: 'Cloud Computing Journal',
    doi: '10.1234/ccj.2023.004'
  },
  {
    id: '6',
    title: 'Cybersecurity Awareness Training Effectiveness Study',
    authors: ['Dr. Jennifer White', 'Prof. Kevin Harris'],
    category: 'Cybersecurity',
    status: 'Published',
    date: '2024-01-12',
    year: '2024',
    abstract: 'A study evaluating the effectiveness of cybersecurity awareness training programs in educational institutions.',
    keywords: ['Cybersecurity', 'Training', 'Awareness', 'Education'],
    citations: 19,
    views: 195,
    downloads: 110,
    journal: 'Cybersecurity Education Review',
    doi: '10.1234/cer.2024.005'
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Published':
      return 'bg-emerald-50 text-emerald-600';
    case 'Under Review':
      return 'bg-yellow-50 text-yellow-600';
    case 'Draft':
      return 'bg-gray-50 text-gray-600';
    case 'Rejected':
      return 'bg-red-50 text-red-600';
    default:
      return 'bg-gray-50 text-gray-600';
  }
};

export const CollegeResearch = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authors: '',
    category: 'Artificial Intelligence',
    status: 'ongoing',
    keywords: '',
    citations: 0,
    views: 0,
    downloads: 0,
    journal: '',
    doi: '',
    date: '',
    year: new Date().getFullYear().toString()
  });

  useEffect(() => {
    fetchResearch();
  }, [selectedCategory]);

  const fetchResearch = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'All Categories') params.append('category', selectedCategory);
      
      const response = await fetch(`${API_URL}/api/research?${params}`);
      const data = await response.json();
      if (data.success) {
        setResearch(data.data);
      }
    } catch (error) {
      console.error('Error fetching research:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResearch = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        authors: formData.authors.split(',').map(a => a.trim()).filter(a => a),
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k)
      };
      
      const response = await fetch(`${API_URL}/api/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      const data = await response.json();
      if (data.success) {
        setShowAddModal(false);
        setFormData({
          title: '',
          description: '',
          authors: '',
          category: 'Artificial Intelligence',
          status: 'ongoing',
          keywords: '',
          citations: 0,
          views: 0,
          downloads: 0,
          journal: '',
          doi: '',
          date: '',
          year: new Date().getFullYear().toString()
        });
        fetchResearch();
        alert('Research added successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error adding research: ' + error.message);
    }
  };

  const handleDeleteResearch = async () => {
    if (!window.confirm('Are you sure you want to delete this research?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/research/${selectedResearch.id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setSelectedResearch(null);
        fetchResearch();
        alert('Research deleted successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error deleting research: ' + error.message);
    }
  };

  const filteredResearch = research.filter(r => {
    const matchesSearch = r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (r.authors || []).some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (r.keywords || []).some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Categories' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">College Research</h2>
          <p className="text-sm text-gray-500">Browse and manage research publications</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                viewMode === 'grid' 
                  ? "bg-white text-orange-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                viewMode === 'list' 
                  ? "bg-white text-orange-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              List
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add Research
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by title, author, or keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border-none text-sm font-medium rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            {researchCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-bold">Showing {filteredResearch.length} research papers</span>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center text-gray-400">Loading research...</div>
          ) : filteredResearch.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-400">No research found</div>
          ) : (
            filteredResearch.map((research) => {
            const StatusIcon = research.status === 'Published' ? Award : FileText;
            return (
              <div 
                key={research.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedResearch(research)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 w-fit mb-2", getStatusColor(research.status))}>
                      <StatusIcon size={10} />
                      {research.status}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{research.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <User size={12} />
                      <span className="line-clamp-1">{(research.authors || []).join(', ') || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                      {research.category}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 line-clamp-3">{research.abstract}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {research.keywords.slice(0, 3).map((keyword, i) => (
                      <span key={i} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {keyword}
                      </span>
                    ))}
                    {research.keywords.length > 3 && (
                      <span className="text-[10px] text-gray-400">+{research.keywords.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        <span>{research.citations}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{research.views}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {research.year}
                    </div>
                  </div>
                </div>
              </div>
            );
          }))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading research...</div>
          ) : filteredResearch.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No research found</div>
          ) : (
            filteredResearch.map((research) => {
            const StatusIcon = research.status === 'Published' ? Award : FileText;
            return (
              <div 
                key={research.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedResearch(research)}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1", getStatusColor(research.status))}>
                        <StatusIcon size={10} />
                        {research.status}
                      </span>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        {research.category}
                      </span>
                      <span className="text-xs text-gray-400">{research.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{research.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <User size={14} />
                      <span>{(research.authors || []).join(', ') || 'N/A'}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{research.abstract}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(research.keywords || []).map((keyword, i) => (
                        <span key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        <span>{research.citations} citations</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{research.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={12} />
                        <span>{research.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            );
          }))}
        </div>
      )}

      {/* Research Detail Modal */}
      {selectedResearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedResearch(null)}>
          <div 
            className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn("text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1", getStatusColor(selectedResearch.status))}>
                    {selectedResearch.status}
                  </span>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {selectedResearch.category}
                  </span>
                  <span className="text-xs text-gray-400">{selectedResearch.year}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedResearch.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <User size={16} />
                  <span>{(selectedResearch.authors || []).join(', ') || 'N/A'}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedResearch(null)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
              >
                <FileText size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Abstract</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedResearch.abstract}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Journal</p>
                  <p className="text-sm font-bold text-gray-900">{selectedResearch.journal}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">DOI</p>
                  <p className="text-sm font-bold text-gray-900">{selectedResearch.doi}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Publication Date</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(selectedResearch.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
                  <span className={cn("text-xs font-bold px-3 py-1 rounded-full", getStatusColor(selectedResearch.status))}>
                    {selectedResearch.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {(selectedResearch.keywords || []).map((keyword, i) => (
                    <span key={i} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <TrendingUp className="text-orange-600 mx-auto mb-2" size={20} />
                  <p className="text-2xl font-bold text-gray-900">{selectedResearch.citations}</p>
                  <p className="text-xs text-gray-500">Citations</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Eye className="text-blue-600 mx-auto mb-2" size={20} />
                  <p className="text-2xl font-bold text-gray-900">{selectedResearch.views}</p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <Download className="text-emerald-600 mx-auto mb-2" size={20} />
                  <p className="text-2xl font-bold text-gray-900">{selectedResearch.downloads}</p>
                  <p className="text-xs text-gray-500">Downloads</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={handleDeleteResearch}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete Research
                </button>
                <button className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold transition-colors">
                  View Full Text
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Research Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Research</h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddResearch} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  autoComplete="off"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authors (comma-separated)</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.authors}
                    onChange={(e) => setFormData(prev => ({...prev, authors: e.target.value}))}
                    placeholder="Dr. John Smith, Prof. Maria Garcia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                  >
                    {researchCategories.filter(c => c !== 'All Categories').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="Published">Published</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({...prev, year: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.journal}
                    onChange={(e) => setFormData(prev => ({...prev, journal: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.doi}
                    onChange={(e) => setFormData(prev => ({...prev, doi: e.target.value}))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma-separated)</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({...prev, keywords: e.target.value}))}
                  placeholder="Machine Learning, Education, Analytics"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

