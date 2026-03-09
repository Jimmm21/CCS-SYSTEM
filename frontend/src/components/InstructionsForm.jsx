import React, { memo } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

const InstructionsForm = memo(({ activeTab, formData, setFormData, syllabi, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Add New {activeTab === 'syllabus' ? 'Syllabus' : activeTab === 'curriculum' ? 'Curriculum' : 'Lesson'}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {activeTab === 'syllabus' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                  <select
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.course}
                    onChange={(e) => setFormData(prev => ({...prev, course: e.target.value}))}
                  >
                    <option value="">Select Course</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSIS">BSIS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({...prev, code: e.target.value}))}
                    placeholder="e.g., IT 301"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.instructor}
                    onChange={(e) => setFormData(prev => ({...prev, instructor: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                  <select
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.semester}
                    onChange={(e) => setFormData(prev => ({...prev, semester: e.target.value}))}
                  >
                    <option value="">Select Semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.academic_year}
                    onChange={(e) => setFormData(prev => ({...prev, academic_year: e.target.value}))}
                    placeholder="e.g., 2024-2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.units}
                    onChange={(e) => setFormData(prev => ({...prev, units: parseInt(e.target.value) || 0}))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.hours}
                    onChange={(e) => setFormData(prev => ({...prev, hours: parseInt(e.target.value) || 0}))}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    autoComplete="off"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'curriculum' && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                  <select
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.course}
                    onChange={(e) => setFormData(prev => ({...prev, course: e.target.value}))}
                  >
                    <option value="">Select Course</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSIS">BSIS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.program}
                    onChange={(e) => setFormData(prev => ({...prev, program: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({...prev, year: e.target.value}))}
                    placeholder="e.g., 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Units *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.total_units}
                    onChange={(e) => setFormData(prev => ({...prev, total_units: parseInt(e.target.value) || 0}))}
                  />
                </div>
              </div>

              {/* Semesters Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Semesters & Subjects *</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newSemester = {
                        semester: '',
                        subjects: []
                      };
                      setFormData(prev => ({
                        ...prev,
                        semesters: [...(prev.semesters || []), newSemester]
                      }));
                    }}
                    className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                  >
                    <Plus size={14} />
                    Add Semester
                  </button>
                </div>

                {formData.semesters && formData.semesters.map((sem, semIdx) => (
                  <div key={semIdx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        required
                        autoComplete="off"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm font-bold"
                        value={sem.semester}
                        onChange={(e) => {
                          const newSemesters = [...formData.semesters];
                          newSemesters[semIdx].semester = e.target.value;
                          setFormData(prev => ({...prev, semesters: newSemesters}));
                        }}
                        placeholder="e.g., 1st Year - 1st Semester"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSemesters = formData.semesters.filter((_, idx) => idx !== semIdx);
                          setFormData(prev => ({...prev, semesters: newSemesters}));
                        }}
                        className="ml-2 p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {sem.subjects && sem.subjects.map((subject, subIdx) => (
                        <div key={subIdx} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                          <input
                            type="text"
                            required
                            autoComplete="off"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm"
                            value={subject.code}
                            onChange={(e) => {
                              const newSemesters = [...formData.semesters];
                              newSemesters[semIdx].subjects[subIdx].code = e.target.value;
                              setFormData(prev => ({...prev, semesters: newSemesters}));
                            }}
                            placeholder="Code (e.g., IT 101)"
                          />
                          <input
                            type="text"
                            required
                            autoComplete="off"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm"
                            value={subject.name}
                            onChange={(e) => {
                              const newSemesters = [...formData.semesters];
                              newSemesters[semIdx].subjects[subIdx].name = e.target.value;
                              setFormData(prev => ({...prev, semesters: newSemesters}));
                            }}
                            placeholder="Subject Name"
                          />
                          <input
                            type="number"
                            required
                            min="0"
                            autoComplete="off"
                            className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm"
                            value={subject.units}
                            onChange={(e) => {
                              const newSemesters = [...formData.semesters];
                              newSemesters[semIdx].subjects[subIdx].units = parseInt(e.target.value) || 0;
                              setFormData(prev => ({...prev, semesters: newSemesters}));
                            }}
                            placeholder="Units"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSemesters = [...formData.semesters];
                              newSemesters[semIdx].subjects = newSemesters[semIdx].subjects.filter((_, idx) => idx !== subIdx);
                              setFormData(prev => ({...prev, semesters: newSemesters}));
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newSemesters = [...formData.semesters];
                          if (!newSemesters[semIdx].subjects) {
                            newSemesters[semIdx].subjects = [];
                          }
                          newSemesters[semIdx].subjects.push({ code: '', name: '', units: 0 });
                          setFormData(prev => ({...prev, semesters: newSemesters}));
                        }}
                        className="w-full px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Plus size={14} />
                        Add Subject
                      </button>
                    </div>
                  </div>
                ))}

                {(!formData.semesters || formData.semesters.length === 0) && (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No semesters added. Click "Add Semester" to get started.
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'lessons' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus *</label>
                  <select
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.syllabus_id}
                    onChange={(e) => setFormData(prev => ({...prev, syllabus_id: e.target.value}))}
                  >
                    <option value="">Select Syllabus</option>
                    {syllabi.map(s => (
                      <option key={s.id} value={s.id}>{s.code} - {s.subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Week *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.week}
                    onChange={(e) => setFormData(prev => ({...prev, week: parseInt(e.target.value) || 1}))}
                  />
                </div>
                <div className="col-span-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
                    placeholder="e.g., 3 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Discussion">Discussion</option>
                  </select>
                </div>
              </div>
            </>
          )}

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
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

InstructionsForm.displayName = 'InstructionsForm';

export default InstructionsForm;

