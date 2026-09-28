export interface User {
  id: string;
  name: string;
  fatherName?: string;
  phone: string;
  email: string;
  nid: string;
  union: string;
  centerName: string;
  address: string;
  password?: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'pending' | 'approved' | 'rejected' | 'blocked';
  statusNote?: string;
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface ToolItem {
  id: string;
  title: string;
  englishTitle: string;
  category: 'certificate' | 'family' | 'voter' | 'trade' | 'agri' | 'cashbook' | 'other';
  categoryBangla: string;
  description: string;
  icon: string;
  file: string; // URL path under /tools/
  badge?: string;
  featured?: boolean;
}

export interface BannerConfig {
  heroTitle: string;
  heroSubtitle: string;
  noticeTicker: string;
  heroImages: string[];
  welcomeNote: string;
  upazilaName: string;
  districtName: string;
  contactPhone: string;
  contactEmail: string;
  noticeBoard: {
    id: string;
    title: string;
    date: string;
    content: string;
  }[];
}

export interface UnionInfo {
  id: string;
  name: string;
  englishName: string;
  chairman: string;
  chairmanEn: string;
  postOffice: string;
  logo: string;
  wardCount: number;
}
