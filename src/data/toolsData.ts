import { ToolItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'income-cert',
    title: 'আয় বিবরণী প্রত্যয়ন',
    englishTitle: 'Income Certificate Generator',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'মাসিক ও বার্ষিক আয়ের হিসাব বাংলায় রূপান্তর ও কিউআর কোডসহ প্রত্যয়নপত্র জেনারেট করুন।',
    icon: 'FileSpreadsheet',
    file: '/tools/income-certificate.html',
    badge: 'জনপ্রিয়',
    featured: true
  },
  {
    id: 'official-citizen-cert',
    title: 'অফিসিয়াল নাগরিক সনদ (বাংলা/ইংলিশ)',
    englishTitle: 'Official Citizen Certificate (Bangla & English with OCR)',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'নাইট মোড ও স্মার্ট ওসিআর স্ক্যান সুবিধাসহ অফিশিয়াল নাগরিক সনদ তৈরি করুন।',
    icon: 'FileBadge',
    file: '/tools/official-citizen-cert.html',
    badge: 'ওসিআর স্ক্যানার',
    featured: true
  },
  {
    id: 'permanent-resident',
    title: 'স্থায়ী বাসিন্দা সনদ',
    englishTitle: 'Permanent Resident Certificate',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'ইউনিয়ন পরিষদের স্থায়ী বাসিন্দা যাচাইকরণ সনদপত্র ও ডিজিটাল কিউআর কোড।',
    icon: 'Home',
    file: '/tools/permanent-resident.html',
    badge: 'ডিজিটাল সিল',
    featured: true
  },
  {
    id: 'same-person',
    title: 'একই ব্যক্তির প্রত্যয়নপত্র',
    englishTitle: 'Same Person / Alias Certificate',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'এনআইডি বা সার্টিফিকেটে ভিন্ন নামের সমস্যার জন্য খাঁটি বাংলা ভাষায় একই ব্যক্তি সনদ।',
    icon: 'UserCheck',
    file: '/tools/same-person-certificate.html',
    badge: 'সংশোধন',
    featured: true
  },
  {
    id: 'character-cert',
    title: 'ডিজিটাল চারিত্রিক সনদ',
    englishTitle: 'Digital Character Certificate',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'নাগরিকের চারিত্রিক সন্তোষজনক সনদ এবং সরকারি জলছাপযুক্ত প্রিন্ট প্যাড।',
    icon: 'ShieldCheck',
    file: '/tools/character-certificate.html',
    badge: 'অফিশিয়াল'
  },
  {
    id: 'name-correction',
    title: 'চারিত্রিক সনদ ও নাম সংশোধন সুপারিশ',
    englishTitle: 'Character Certificate with Name Correction Recommendation',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'জাতীয় পরিচয়পত্রে ভুল নাম সংশোধনে চেয়ারম্যান কর্তৃক বিশেষ সুপারিশ প্রত্যয়ন।',
    icon: 'FileText',
    file: '/tools/name-correction.html'
  },
  {
    id: 'pratyayan-patra',
    title: 'সাধারণ প্রত্যয়ন পত্র (ইপিআই/জন্ম তারিখ)',
    englishTitle: 'General Pratyayan Patra (EPI & Birth Basis)',
    category: 'certificate',
    categoryBangla: 'নাগরিক ও প্রত্যয়ন',
    description: 'ইপিআই কার্ড বা জন্ম সনদের ভিত্তিতে স্ট্যান্ডার্ড এ-ফোর প্রত্যয়নপত্র ও স্বাক্ষর সিল।',
    icon: 'Award',
    file: '/tools/pratyayan-patra.html'
  },
  {
    id: 'warishan-cert',
    title: 'ওয়ারিশন সনদ প্রস্তুতকারক',
    englishTitle: 'Warishan / Inheritance Certificate',
    category: 'family',
    categoryBangla: 'পারিবারিক ও ওয়ারিশান',
    description: 'মৃত ব্যক্তির সকল বৈধ ওয়ারিশগণের বিস্তারিত তথ্য ও আইডি নম্বরসহ সনদপত্র।',
    icon: 'Users',
    file: '/tools/warishan-certificate.html',
    badge: 'জরুরি',
    featured: true
  },
  {
    id: 'family-cert-bn-v2',
    title: 'পারিবারিক সনদপত্র (ভার্সন ২ - কিউআর কোড)',
    englishTitle: 'Family Certificate Bangla v2 with QR',
    category: 'family',
    categoryBangla: 'পারিবারিক ও ওয়ারিশান',
    description: 'পরিবার প্রধান ও সদস্যদের পেশা, আইডি ও সেন্ট্রাল কিউআর কোডসহ পারিবারিক সনদ।',
    icon: 'HeartHandshake',
    file: '/tools/family-cert-bn-v2.html',
    badge: 'আপগ্রেডেড',
    featured: true
  },
  {
    id: 'family-cert-bn',
    title: 'পারিবারিক সনদ প্রস্তুতকারক (ক্লাসিক বাংলা)',
    englishTitle: 'Family Certificate Classic (Bangla)',
    category: 'family',
    categoryBangla: 'পারিবারিক ও ওয়ারিশান',
    description: 'বর্ডারযুক্ত অফিসিয়াল প্যাডে পরিবারের সদস্যদের বাংলা তালিকা সনদ।',
    icon: 'UsersRound',
    file: '/tools/family-cert-bn.html'
  },
  {
    id: 'family-cert-en',
    title: 'Family Certificate Pro (English)',
    englishTitle: 'Family Certificate Management System (English)',
    category: 'family',
    categoryBangla: 'পারিবারিক ও ওয়ারিশান',
    description: 'Complete English format family certificate with JSON backup & history.',
    icon: 'Globe',
    file: '/tools/family-cert-en.html',
    badge: 'English'
  },
  {
    id: 'nominee-cert',
    title: 'ভাতাভোগীর নমিনি প্রত্যয়নপত্র',
    englishTitle: 'Deceased Pensioner Nominee Certificate',
    category: 'family',
    categoryBangla: 'পারিবারিক ও ওয়ারিশান',
    description: 'মৃত বয়স্ক/বিধবা/প্রতিবন্ধী ভাতাভোগীর ব্যাংকিং নমিনি প্রত্যয়নপত্র।',
    icon: 'HandCoins',
    file: '/tools/nominee-certificate.html'
  },
  {
    id: 'trade-license-bn',
    title: 'ডিজিটাল ট্রেড লাইসেন্স (বাংলা)',
    englishTitle: 'Digital Trade License (Bangla Format)',
    category: 'trade',
    categoryBangla: 'ট্রেড লাইসেন্স ও ব্যবসা',
    description: 'মডেল কর তফসিল ২০১৩ অনুযায়ী ট্রেড লাইসেন্স, কর ও ভ্যাট হিসাব ও কিউআর কোড।',
    icon: 'Store',
    file: '/tools/trade-license-bn.html',
    badge: 'মডেল কর',
    featured: true
  },
  {
    id: 'trade-license-en',
    title: 'Digital Trade License (English)',
    englishTitle: 'Digital Trade License (English Format)',
    category: 'trade',
    categoryBangla: 'ট্রেড লাইসেন্স ও ব্যবসা',
    description: 'Complete English business trade license with fee calculator and QR validation.',
    icon: 'Briefcase',
    file: '/tools/trade-license-en.html',
    badge: 'English'
  },
  {
    id: 'new-voter-cert',
    title: 'নতুন ভোটার প্রত্যয়নপত্র',
    englishTitle: 'New Voter Registration Certificate',
    category: 'voter',
    categoryBangla: 'নির্বাচন ও ভোটার',
    description: 'ভোটার তালিকায় অন্তর্ভুক্তিকরণের জন্য ইউপি চেয়ারম্যান প্রত্যয়ন ও ইতিহাস।',
    icon: 'Vote',
    file: '/tools/new-voter-certificate.html',
    featured: true
  },
  {
    id: 'voter-transfer-cert',
    title: 'ভোটার এলাকা স্থানান্তর প্রত্যয়নপত্র',
    englishTitle: 'Voter Area Transfer Recommendation',
    category: 'voter',
    categoryBangla: 'নির্বাচন ও ভোটার',
    description: 'নির্বাচনী এলাকা বা ওয়ার্ড স্থানান্তরের সুপারিশকৃত প্রত্যয়নপত্র।',
    icon: 'Repeat',
    file: '/tools/voter-transfer.html'
  },
  {
    id: 'krishi-cert',
    title: 'ডিজিটাল কৃষি প্রত্যয়ন',
    englishTitle: 'Digital Agriculture Certificate',
    category: 'agri',
    categoryBangla: 'কৃষি ও জনস্বাস্থ্য',
    description: 'প্রকৃত কৃষক/কৃষাণী সনাক্তকরণ ও কৃষি কার্ড সংক্রান্ত প্রত্যয়নপত্র।',
    icon: 'Tractor',
    file: '/tools/krishi-certificate.html'
  },
  {
    id: 'deep-tubewell',
    title: 'গভীর নলকূপের আবেদনপত্র',
    englishTitle: 'Deep Tubewell Application to UNO',
    category: 'agri',
    categoryBangla: 'কৃষি ও জনস্বাস্থ্য',
    description: 'ইউএনও বরাবর আর্সেনিকমুক্ত গভীর নলকূপ বরাদ্দের আবেদনপত্র জেনারেটর।',
    icon: 'Droplets',
    file: '/tools/deep-tubewell.html'
  },
  {
    id: 'marriage-cert',
    title: 'বিবাহিত সনদ (Marriage Certificate)',
    englishTitle: 'Marriage Certificate Online Generator',
    category: 'other',
    categoryBangla: 'জন্ম, মৃত্যু ও বিবাহ',
    description: 'স্বামী ও স্ত্রীর তথ্য এবং নিকাহ রেজিস্ট্রারের রেফারেন্সে বিবাহিত প্রত্যয়নপত্র।',
    icon: 'Sparkles',
    file: '/tools/marriage-certificate.html'
  },
  {
    id: 'death-cert',
    title: 'ডিজিটাল মৃত্যু সনদ',
    englishTitle: 'Digital Death Certificate Generator',
    category: 'other',
    categoryBangla: 'জন্ম, মৃত্যু ও বিবাহ',
    description: 'মৃত্যুর তারিখ, সময় ও কারণ উল্লেখসহ ডিজিটাল মৃত্যু সনদপত্র ও হিস্ট্রি এডিট।',
    icon: 'ScrollText',
    file: '/tools/death-certificate.html'
  },
  {
    id: 'digital-cashbook',
    title: 'ডিজিটাল সেন্টার অটোমেটেড ডাটা এন্ট্রি ও বাকির খাতা',
    englishTitle: 'Digital Center Automated Data Entry, Due Book & OCR',
    category: 'cashbook',
    categoryBangla: 'হিসাব ও অটোমেশন',
    description: 'ছবি পেস্ট করে অটো OCR স্ক্যান, জন্ম ও মৃত্যু আবেদন সনাক্তকরণ, লাভ-বাকি হিসাব ও এক্সেল এক্সপোর্ট।',
    icon: 'Calculator',
    file: '/tools/digital-center-cashbook.html',
    badge: 'স্মার্ট সফটওয়্যার',
    featured: true
  },
  {
    id: 'practice-page',
    title: 'টেস্টিং ও প্র্যাকটিস পেজ',
    englishTitle: 'Practice & System Test Page',
    category: 'other',
    categoryBangla: 'অন্যান্য ইউটিলিটি',
    description: 'সিস্টেম টেস্ট ও ভেরিফিকেশনের জন্য টেস্ট পেজ।',
    icon: 'FileCode',
    file: '/tools/practice-page.html'
  }
];
