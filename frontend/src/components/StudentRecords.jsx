import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, UserPlus, MoreVertical, Mail, Phone, GraduationCap, X, Trash2, FileText, Edit } from 'lucide-react';
import { StudentForm } from './StudentForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const StudentRecords = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All Courses');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    contact_number: '',
    course: 'BSIT',
    year_level: '1st Year',
    enrollment_status: 'Enrolled'
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/students`);
      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setShowAddModal(false);
        setFormData({
          student_id: '',
          first_name: '',
          last_name: '',
          middle_name: '',
          email: '',
          contact_number: '',
          course: 'BSIT',
          year_level: '1st Year',
          enrollment_status: 'Enrolled'
        });
        fetchStudents();
        alert('Student added successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error adding student: ' + error.message);
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setShowEditModal(false);
        fetchStudents();
        setSelectedStudent(data.data);
        alert('Student updated successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error updating student: ' + error.message);
    }
  };

  const handleDeleteStudent = async () => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/students/${selectedStudent.id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setSelectedStudent(null);
        fetchStudents();
        alert('Student deleted successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error deleting student: ' + error.message);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      student_id: student.student_id || '',
      first_name: student.first_name || '',
      last_name: student.last_name || '',
      middle_name: student.middle_name || '',
      email: student.email || '',
      contact_number: student.contact_number || '',
      course: student.course || 'BSIT',
      year_level: student.year_level || '1st Year',
      enrollment_status: student.enrollment_status || 'Enrolled'
    });
    setShowEditModal(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = filterCourse === 'All Courses' || student.course === filterCourse;
    
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="flex gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              className="bg-gray-50 border-none text-sm font-medium rounded-xl px-4 py-2 outline-none"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option>All Courses</option>
              <option>BSIT</option>
              <option>BSCS</option>
              <option>BSIS</option>
            </select>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <UserPlus size={18} />
              Add Student
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-400">Loading students...</div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-400">No students found</div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Middle Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student Number</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Year Level</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className={`hover:bg-orange-50/30 cursor-pointer transition-colors ${selectedStudent?.id === student.id ? 'bg-orange-50/50' : ''}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.last_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.first_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.middle_name || '-'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{student.student_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.year_level}</td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => openEditModal(student)}
                        className="p-1 hover:bg-gray-100 rounded-lg text-gray-400"
                        title="Edit"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedStudent && (
        <div className="w-80 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center animate-in slide-in-from-right-4 duration-500">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.first_name}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 uppercase">
            {selectedStudent.first_name} {selectedStudent.middle_name || ''} {selectedStudent.last_name}
          </h3>
          <p className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-8">
            {selectedStudent.course} - {selectedStudent.student_id}
          </p>

          <div className="w-full space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <Mail size={16} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-sm text-gray-700 truncate">{selectedStudent.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Number</p>
                <p className="text-sm text-gray-700">{selectedStudent.contact_number || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <GraduationCap size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enrollment Status</p>
                <p className="text-sm text-gray-700">{selectedStudent.enrollment_status}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto w-full pt-8 border-t border-gray-50 space-y-3">
            <button 
              onClick={() => openEditModal(selectedStudent)}
              className="w-full px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </button>
            <button 
              onClick={() => setShowLogsModal(true)}
              className="w-full px-4 py-2 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <FileText size={16} />
              View Logs
            </button>
            <button 
              onClick={handleDeleteStudent}
              className="w-full px-4 py-2 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Delete Student
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <StudentForm 
          key="add"
          title="Add New Student"
          onSubmit={handleAddStudent}
          onCancel={() => setShowAddModal(false)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {showEditModal && (
        <StudentForm 
          key="edit"
          title="Edit Student"
          onSubmit={handleEditStudent}
          onCancel={() => setShowEditModal(false)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {showLogsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowLogsModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Activity Logs - {selectedStudent.first_name} {selectedStudent.last_name}</h2>
              <button onClick={() => setShowLogsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-900">Record Created</p>
                  <p className="text-xs text-gray-500">{new Date(selectedStudent.created_at).toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-xs text-gray-500">{new Date(selectedStudent.created_at).toLocaleString()}</p>
                </div>
                <div className="text-center text-gray-400 text-sm py-8">
                  No additional activity logs available
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
