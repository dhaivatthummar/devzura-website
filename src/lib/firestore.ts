import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Project, BlogPost, ContactSubmission, TeamMember } from "./types";

// ============ PROJECTS ============
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Project[];
  } catch {
    return [];
  }
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const q = query(
      collection(db, "projects"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Project[];
  } catch {
    return [];
  }
}

export async function addProject(project: Omit<Project, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "projects"), {
    ...project,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  await updateDoc(doc(db, "projects", id), project);
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// ============ BLOGS ============
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as BlogPost[];
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docData = snapshot.docs[0];
    return {
      id: docData.id,
      ...docData.data(),
      createdAt: docData.data().createdAt?.toDate(),
    } as BlogPost;
  } catch {
    return null;
  }
}

export async function addBlog(blog: Omit<BlogPost, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "blogs"), {
    ...blog,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateBlog(id: string, blog: Partial<BlogPost>): Promise<void> {
  await updateDoc(doc(db, "blogs", id), blog);
}

export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogs", id));
}

// ============ CONTACTS ============
export async function getContacts(): Promise<ContactSubmission[]> {
  try {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as ContactSubmission[];
  } catch {
    return [];
  }
}

export async function addContact(
  contact: Omit<ContactSubmission, "id" | "createdAt" | "read">
): Promise<string> {
  const docRef = await addDoc(collection(db, "contacts"), {
    ...contact,
    read: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function markContactRead(id: string): Promise<void> {
  await updateDoc(doc(db, "contacts", id), { read: true });
}

export async function deleteContact(id: string): Promise<void> {
  await deleteDoc(doc(db, "contacts", id));
}

// ============ TEAM ============
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const q = query(collection(db, "team"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TeamMember[];
  } catch {
    return [];
  }
}

export async function addTeamMember(
  member: Omit<TeamMember, "id">
): Promise<string> {
  const docRef = await addDoc(collection(db, "team"), member);
  return docRef.id;
}

export async function updateTeamMember(
  id: string,
  member: Partial<TeamMember>
): Promise<void> {
  await updateDoc(doc(db, "team", id), member);
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, "team", id));
}
