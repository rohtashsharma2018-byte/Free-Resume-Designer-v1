import { ResumeData } from '../types';

const DB_NAME = 'resume_designer_db';
const DB_VERSION = 1;
const STORE_NAME = 'resumes';

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export function getAllResumes(): Promise<ResumeData[]> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        // Sort by updatedAt descending by default
        const result = (request.result || []) as ResumeData[];
        result.sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

export function getResume(id: string): Promise<ResumeData | null> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

export function saveResume(resume: ResumeData): Promise<void> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const clone = {
        ...resume,
        updatedAt: Date.now()
      };
      
      const request = store.put(clone);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

export function deleteResume(id: string): Promise<void> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

export function deleteAllResumes(): Promise<void> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

export function createDefaultResume(title = 'My Resume'): ResumeData {
  const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11);
  return {
    id,
    title,
    templateId: 'modern-minimal',
    primaryColor: '#3b82f6', // Tailwind blue-500
    fontSize: 'base',
    fontFamily: 'sans',
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      nationality: '',
      gender: '',
      website: '',
      linkedin: '',
      github: '',
      bio: '',
    },
    education: [],
    experience: [],
    skills: [
      { id: '1', name: 'Technical Skills', skills: [] },
      { id: '2', name: 'Soft Skills', skills: [] }
    ],
    projects: [],
    certifications: [],
    awards: [],
    achievements: [],
    languages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}
