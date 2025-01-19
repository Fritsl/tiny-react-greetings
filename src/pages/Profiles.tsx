import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Copy, Pencil, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { mockProfiles } from '../types/profiles';

export function Profiles() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(mockProfiles);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateProfile = () => {
    const newProfile = {
      id: crypto.randomUUID(),
      name: 'New Profile',
      headline: 'No headline set',
      location: '',
      type: 'Full-time',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: profiles.length === 0
    };
    
    setProfiles(prev => [newProfile, ...prev]);
    navigate('/');
  };

  const handleDuplicate = (profile: typeof mockProfiles[0]) => {
    const duplicatedProfile = {
      ...profile,
      id: crypto.randomUUID(),
      name: `${profile.name} (Copy)`,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setProfiles(prev => [duplicatedProfile, ...prev]);
  };

  const handleDelete = (id: string) => {
    setProfiles(profiles.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSetActive = (id: string) => {
    setProfiles(profiles.map(p => ({
      ...p,
      isActive: p.id === id
    })));
  };

  const handleEdit = (profile: typeof mockProfiles[0]) => {
    if (!profile.isActive) {
      handleSetActive(profile.id);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Your Profiles</h1>
              <p className="text-muted mt-1">
                Create and manage different profiles for various job searches
              </p>
            </div>
            <button
              onClick={handleCreateProfile}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              New Profile
            </button>
          </div>

          {profiles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted">No profiles yet. Create your first profile to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profiles.map(profile => (
                <div
                  key={profile.id}
                  className={`bg-card rounded-lg border ${
                    profile.isActive ? 'border-primary' : 'border-border'
                  } p-6 space-y-4`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {profile.headline}
                      </h3>
                    </div>
                    {profile.isActive && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <CheckCircle2 className="w-4 h-4" />
                        Active
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Clock className="w-4 h-4" />
                      Updated {new Date(profile.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(profile)}
                        disabled={isProcessing}
                        className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit profile"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(profile)}
                        disabled={isProcessing}
                        className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Duplicate profile"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(profile.id)}
                        disabled={isProcessing}
                        className="p-2 text-muted hover:text-destructive hover:bg-destructive/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {!profile.isActive && (
                      <button
                        onClick={() => handleSetActive(profile.id)}
                        disabled={isProcessing}
                        className="text-sm text-primary hover:text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Set as active
                      </button>
                    )}
                  </div>

                  {showDeleteConfirm === profile.id && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-card p-6 rounded-lg border border-border shadow-lg max-w-sm w-full mx-4">
                        <h4 className="text-lg font-semibold text-foreground">Delete Profile?</h4>
                        <p className="text-muted mt-2">
                          Are you sure you want to delete this profile? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            disabled={isProcessing}
                            className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(profile.id)}
                            disabled={isProcessing}
                            className="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}