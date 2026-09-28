import JSZip from 'jszip';
import { BannerConfig, User } from '../types';

const STORAGE_USERS_KEY = 'itna_portal_users_v1';
const STORAGE_AUTH_KEY = 'itna_portal_current_user_v1';
const STORAGE_BANNER_KEY = 'itna_portal_banner_config_v1';

const DEFAULT_BANNER_CONFIG: BannerConfig = {
  heroTitle: 'ইটনা উপজেলা ডিজিটাল সেন্টার ও প্রত্যয়নপত্র পোর্টাল',
  heroSubtitle: 'কিশোরগঞ্জ জেলার ইটনা উপজেলার ৯টি ইউনিয়নের সকল ধরনের অনলাইন প্রত্যয়নপত্র, ট্রেড লাইসেন্স ও ডিজিটাল সেন্টারের অটোমেটেড সেবা',
  noticeTicker: '📢 বিজ্ঞপ্তি: ইটনা উপজেলার সকল ইউনিয়ন ডিজিটাল সেন্টারের উদ্যোক্তাদের অনলাইনে প্রত্যয়নপত্র ও ট্রেড লাইসেন্স ইস্যুর নির্দেশ দেওয়া হলো। নতুন উদ্যোক্তা রেজিস্ট্রেশন করুন এবং এডমিনের অনুমোদনের অপেক্ষা করুন।',
  welcomeNote: 'স্মার্ট বাংলাদেশ বিনির্মাণে স্মার্ট ইটনা ইউনিয়ন সেবা',
  upazilaName: 'ইটনা',
  districtName: 'কিশোরগঞ্জ',
  contactPhone: '০১৭০০-০০০০০০',
  contactEmail: 'admin@itna.gov.bd',
  heroImages: [
    'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop', // beautiful Bangladesh greenery & river
    'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop', // administrative / digital service
    'https://images.unsplash.com/photo-1627916607164-7b20241db935?q=80&w=1200&auto=format&fit=crop'  // countryside & community
  ],
  noticeBoard: [
    {
      id: 'n-1',
      title: 'নতুন ভোটার অন্তর্ভুক্তি ও স্থানান্তর প্রত্যয়ন ফরম হালনাগাদ',
      date: '২৮ সেপ্টেম্বর, ২০২৬',
      content: 'উপজেলার সকল ইউনিয়ন পরিষদ কার্যালয়ে নতুন ভোটার অন্তর্ভুক্তি ও স্থানান্তর প্রত্যয়নপত্র জেনারেটরের সর্বশেষ ফরম্যাট সংযুক্ত করা হয়েছে।'
    },
    {
      id: 'n-2',
      title: 'মডেল কর তফসিল ২০১৩ অনুযায়ী ট্রেড লাইসেন্স অটোমেশন',
      date: '২৫ সেপ্টেম্বর, ২০২৬',
      content: 'সকল ব্যবসা প্রতিষ্ঠান ও দোকানপাটের ট্রেড লাইসেন্স কিউআর কোডসহ দ্রুত প্রিন্ট করা যাবে।'
    },
    {
      id: 'n-3',
      title: 'ডিজিটাল সেন্টারের জন্য বাকির খাতা ও ইমেজ ওসিআর রিলিজ',
      date: '২০ সেপ্টেম্বর, ২০২৬',
      content: 'ছবি পেস্ট করলেই অটোমেটিক জন্ম-মৃত্যু আবেদন সনাক্তকরণ এবং লাভ-বকেয়া হিসাব ব্যবস্থাপনা চালু রয়েছে।'
    }
  ]
};

const SEED_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'উপজেলা ডিজিটাল এডমিন',
    fatherName: 'মরহুম আব্দুল খালেক',
    phone: '01700000000',
    email: 'admin@itna.gov.bd',
    nid: '19901234567890123',
    union: '৪নং ইটনা',
    centerName: 'ইটনা উপজেলা কেন্দ্রীয় সেবা কেন্দ্র',
    address: 'উপজেলা পরিষদ চত্বর, ইটনা, কিশোরগঞ্জ',
    password: 'admin123',
    role: 'admin',
    status: 'approved',
    createdAt: '2026-01-01T10:00:00.000Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: 'user-approved-demo',
    name: 'রাকিবুল হাসান',
    fatherName: 'মো: মোশারফ হোসেন',
    phone: '01711223344',
    email: 'rakib@itna.gov.bd',
    nid: '19951234567890456',
    union: '৪নং ইটনা',
    centerName: 'রাকিব ডিজিটাল সেন্টার ও ফটোকপি',
    address: 'ইটনা পুরাতন বাজার, ৪নং ওয়ার্ড, ইটনা',
    password: 'user123',
    role: 'user',
    status: 'approved',
    createdAt: '2026-02-15T12:30:00.000Z',
    lastLogin: '2026-09-27T18:20:00.000Z'
  },
  {
    id: 'user-pending-demo',
    name: 'মো: নাজমুল ইসলাম',
    fatherName: 'মো: রফিকুল ইসলাম',
    phone: '01899112233',
    email: 'nazmul@gmail.com',
    nid: '19985678901234567',
    union: '১নং রায়টুটী',
    centerName: 'রায়টুটী ফ্রিল্যান্সিং ও সেবা পয়েন্ট',
    address: 'রায়টুটী বাজার, রায়টুটী-২৩৯০',
    password: 'user123',
    role: 'user',
    status: 'pending',
    createdAt: '2026-09-28T03:15:00.000Z'
  },
  {
    id: 'user-blocked-demo',
    name: 'আবুল কালাম',
    fatherName: 'সামসুল হক',
    phone: '01911998877',
    email: 'kalam@gmail.com',
    nid: '19875678901234888',
    union: '৬নং বাদলা',
    centerName: 'বাদলা ডিজিটাল কম্পিউটার্স',
    address: 'বাদলা নতুন বাজার, ইটনা',
    password: 'user123',
    role: 'user',
    status: 'blocked',
    statusNote: 'ফি জমা সংক্রান্ত অনিয়মের কারণে সাময়িক বন্ধ',
    createdAt: '2026-03-10T11:00:00.000Z'
  }
];

export const dbService = {
  // Users
  getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_USERS;
    }
  },

  saveUsers(users: User[]) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event('portal_db_updated'));
  },

  registerUser(data: Omit<User, 'id' | 'role' | 'status' | 'createdAt'>): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
    // Check duplicates
    const phoneExists = users.some(u => u.phone === data.phone.trim());
    if (phoneExists) {
      return { success: false, message: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা হয়েছে!' };
    }

    if (data.email) {
      const emailExists = users.some(u => u.email.toLowerCase() === data.email.trim().toLowerCase());
      if (emailExists) {
        return { success: false, message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে!' };
      }
    }

    const newUser: User = {
      ...data,
      id: 'usr-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      role: 'user',
      status: 'pending', // All new registrations go to admin approval!
      createdAt: new Date().toISOString()
    };

    users.unshift(newUser);
    this.saveUsers(users);

    return {
      success: true,
      message: 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এডমিনের অনুমোদনের জন্য রিকোয়েস্ট পাঠানো হয়েছে। এডমিন অনুমোদন দিলে আপনি লগইন করতে পারবেন।',
      user: newUser
    };
  },

  login(identifier: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const cleanId = identifier.trim().toLowerCase();

    const user = users.find(u => 
      (u.phone === identifier.trim() || u.email.toLowerCase() === cleanId) &&
      u.password === password
    );

    if (!user) {
      return { success: false, message: 'ভুল মোবাইল নম্বর/ইমেইল অথবা পাসওয়ার্ড!' };
    }

    // Check account status
    if (user.status === 'pending') {
      return { 
        success: false, 
        message: '⚠️ আপনার অ্যাকাউন্টটি এখনও অনুমোদনের অপেক্ষায় রয়েছে! এডমিন অনুমোদন দিলে আপনি ড্যাশবোর্ডে প্রবেশ করতে পারবেন।' 
      };
    }

    if (user.status === 'blocked') {
      return { 
        success: false, 
        message: `🚫 আপনার অ্যাকাউন্টটি সাময়িকভাবে বন্ধ (স্থগিত) করা হয়েছে। ${user.statusNote ? 'কারণ: ' + user.statusNote : 'বিস্তারিত জানতে এডমিনের সাথে যোগাযোগ করুন।'}` 
      };
    }

    if (user.status === 'rejected') {
      return { 
        success: false, 
        message: `❌ আপনার অ্যাকাউন্টের আবেদনটি বাতিল করা হয়েছে। ${user.statusNote ? 'কারণ: ' + user.statusNote : ''}` 
      };
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    this.saveUsers(users);

    // Save current auth session
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('portal_auth_changed'));

    return { success: true, message: 'লগইন সফল হয়েছে!', user };
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!raw) return null;
    try {
      const u = JSON.parse(raw);
      // verify still exists in db
      const all = this.getUsers();
      const fresh = all.find(x => x.id === u.id);
      return fresh || null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_AUTH_KEY);
    window.dispatchEvent(new Event('portal_auth_changed'));
  },

  updateUserStatus(userId: string, status: User['status'], note?: string): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx].status = status;
    if (note !== undefined) {
      users[idx].statusNote = note;
    }

    this.saveUsers(users);

    // If current logged in user was modified, sync session
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      if (status !== 'approved') {
        this.logout();
      } else {
        localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(users[idx]));
      }
    }

    return true;
  },

  deleteUser(userId: string): boolean {
    let users = this.getUsers();
    users = users.filter(u => u.id !== userId);
    this.saveUsers(users);
    return true;
  },

  updateUserProfile(userId: string, updates: Partial<User>): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx] = { ...users[idx], ...updates };
    this.saveUsers(users);

    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(users[idx]));
    }

    return true;
  },

  // Banner & Site Config
  getBannerConfig(): BannerConfig {
    const raw = localStorage.getItem(STORAGE_BANNER_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_BANNER_KEY, JSON.stringify(DEFAULT_BANNER_CONFIG));
      return DEFAULT_BANNER_CONFIG;
    }
    try {
      return { ...DEFAULT_BANNER_CONFIG, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_BANNER_CONFIG;
    }
  },

  saveBannerConfig(config: BannerConfig) {
    localStorage.setItem(STORAGE_BANNER_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('portal_banner_updated'));
  },

  // Full DB backup & restore
  exportFullDatabase(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      users: this.getUsers(),
      bannerConfig: this.getBannerConfig(),
      // Also grab certificate tools histories from localStorage
      cashbookRecords: localStorage.getItem('smart_portal_records_v4'),
      familyHistory: localStorage.getItem('itna_family_history'),
      samePersonList: localStorage.getItem('same_person_list'),
      voterHistory: localStorage.getItem('voter_final_history'),
      deathHistory: localStorage.getItem('death_history'),
      marriageHistory: localStorage.getItem('marriage_history'),
      transferHistory: localStorage.getItem('transfer_history'),
      residentHistory: localStorage.getItem('resident_history'),
      nomineeHistory: localStorage.getItem('nominee_history')
    };
    return JSON.stringify(data, null, 2);
  },

  importFullDatabase(jsonStr: string): { success: boolean; message: string } {
    try {
      const data = JSON.parse(jsonStr);
      if (data.users && Array.isArray(data.users)) {
        this.saveUsers(data.users);
      }
      if (data.bannerConfig) {
        this.saveBannerConfig(data.bannerConfig);
      }
      if (data.cashbookRecords) localStorage.setItem('smart_portal_records_v4', data.cashbookRecords);
      if (data.familyHistory) localStorage.setItem('itna_family_history', data.familyHistory);
      if (data.samePersonList) localStorage.setItem('same_person_list', data.samePersonList);
      if (data.voterHistory) localStorage.setItem('voter_final_history', data.voterHistory);
      if (data.deathHistory) localStorage.setItem('death_history', data.deathHistory);
      if (data.marriageHistory) localStorage.setItem('marriage_history', data.marriageHistory);
      if (data.transferHistory) localStorage.setItem('transfer_history', data.transferHistory);
      if (data.residentHistory) localStorage.setItem('resident_history', data.residentHistory);
      if (data.nomineeHistory) localStorage.setItem('nominee_history', data.nomineeHistory);

      return { success: true, message: 'ডাটাবেস সফলভাবে রিস্টোর করা হয়েছে!' };
    } catch {
      return { success: false, message: 'ভুল ব্যাকআপ ফাইল! JSON ফরমেট সঠিক নয়।' };
    }
  },

  // Generate Netlify Deployable Package (.ZIP)
  async generateNetlifyZip(onProgress?: (percent: number, status: string) => void): Promise<Blob> {
    const zip = new JSZip();

    onProgress?.(10, 'ফাইলগুলো সংগ্রহ করা হচ্ছে...');

    // List of tools
    const tools = [
      'income-certificate.html',
      'family-cert-en.html',
      'warishan-certificate.html',
      'same-person-certificate.html',
      'deep-tubewell.html',
      'krishi-certificate.html',
      'character-certificate.html',
      'digital-center-cashbook.html',
      'pratyayan-patra.html',
      'trade-license-en.html',
      'trade-license-bn.html',
      'new-voter-certificate.html',
      'official-citizen-cert.html',
      'family-cert-bn.html',
      'family-cert-bn-v2.html',
      'practice-page.html',
      'nominee-certificate.html',
      'marriage-certificate.html',
      'voter-transfer.html',
      'death-certificate.html',
      'name-correction.html',
      'permanent-resident.html'
    ];

    const toolsFolder = zip.folder('tools');

    let loaded = 0;
    for (const toolFile of tools) {
      try {
        const response = await fetch(`/tools/${toolFile}`);
        if (response.ok) {
          const content = await response.text();
          toolsFolder?.file(toolFile, content);
        }
      } catch (err) {
        console.warn(`Could not bundle tool: ${toolFile}`, err);
      }
      loaded++;
      onProgress?.(10 + Math.round((loaded / tools.length) * 50), `${toolFile} বান্ডেল করা হচ্ছে...`);
    }

    // Add Netlify SPA redirect
    zip.file('_redirects', '/*    /index.html   200\n');
    zip.file('netlify.toml', `[build]\n  publish = "."\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n`);

    // Add README with deploy instructions
    const readmeContent = `# ইটনা উপজেলা ডিজিটাল সেন্টার ও প্রত্যয়নপত্র পোর্টাল
    
## Netlify-তে আপলোড করার সহজ নিয়ম:
1. এই জিপ (ZIP) ফাইলটি আনজিপ (Extract) করুন।
2. ব্রাউজারে https://app.netlify.com/drop ওপেন করুন।
3. আনজিপ করা ফোল্ডারটি সরাসরি ড্র্যাগ করে Netlify Drop এ ছেড়ে দিন।
4. মাত্র কয়েক সেকেন্ডেই আপনার পুরো সাইট লাইভ হয়ে যাবে!

## অন্তর্ভুক্ত সুবিধাসমূহ:
- সকল প্রত্যয়নপত্র ও ট্রেড লাইসেন্স টুলস (/tools/ ফোল্ডারে সংরক্ষিত)
- ইউজার একাউন্ট রেজিস্ট্রেশন ও এডমিন অনুমোদন ব্যবস্থা
- এডমিন প্যানেল থেকে ব্যানার ইমেজ পরিবর্তন
- ইউজার ব্লক/আনব্লক ও ডাটাবেজ ব্যাকআপ
- ড্যাশবোর্ড ও ক্যাশবুক সিস্টেম
`;
    zip.file('README.md', readmeContent);

    onProgress?.(80, 'মেইন এপ্লিকেশন ফাইল প্রসেসিং...');

    // Fetch current index.html or generate a standalone index.html
    try {
      const idxRes = await fetch('/');
      if (idxRes.ok) {
        const idxText = await idxRes.text();
        zip.file('index.html', idxText);
      }
    } catch (e) {
      console.warn('Could not fetch index.html', e);
    }

    onProgress?.(95, 'জিপ ফাইল কম্প্রেস করা হচ্ছে...');
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    onProgress?.(100, 'ডাউনলোড প্রস্তুত!');

    return blob;
  }
};
