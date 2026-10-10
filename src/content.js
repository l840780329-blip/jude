import dimensions from './asset-dimensions.js';
import { pptProjects, pptDimensions } from './ppt-projects.js';
import { gateAnnualProject, gateProjects, gateDimensions } from './gate-projects.js';
// Project assets come from the portfolio; career details follow the latest supplied résumé.
export const profile = {
 name: '李昊哲', email: '840780329@qq.com', phone: '13012252051',
 education: '天津师范大学 · 视觉传达',
 tools: ['Blender', 'Photoshop', 'Figma', 'Sketch', 'Illustrator', 'After Effects', 'Nano Banana', 'ChatGPT'],
 experience: [
  {
   company: 'WASABICARD', role: 'Web3 品牌设计师', dates: '2026.06 — 至今', current: true,
   description: '独立负责公司设计内容，连接品牌表达与线上、线下应用。',
   highlights: [
    { title: '品牌升级', text: '负责品牌视觉升级与品牌宣发设计，完善品牌在不同场景中的视觉表达。' },
    { title: '展会与周边', text: '负责品牌展会、系列物料及品牌周边设计，推进线下传播落地。' },
    { title: '多场景交付', text: '涵盖实体银行卡面设计与 PPT 制作，独立承接公司各类设计需求。' }
   ]
  },
  {
   company: 'GATE', role: 'Web3 品牌设计师', dates: '2025.10 — 2026.04',
   description: '围绕 Web3 品牌传播，负责品牌宣发与活动视觉设计。',
   highlights: [
    { title: '品牌传播', text: '负责 Web3 机场投放广告与马耳他活动海报设计，支持品牌推广。' },
    { title: '内容与活动', text: '负责 Gatecast 访谈视觉及年会页面设计，延展品牌在内容与活动中的表达。' }
   ]
  },
  {
   company: '抖音集团', role: '视觉设计师', dates: '2021.07 — 2025.10',
   description: '从大型用户增长活动到抖音精选 App 的 0→1，持续探索 AI 与活动设计的结合。',
   highlights: [
    { title: '增长活动 / POC', text: '负责国庆、春节、五一与暑期活动设计，在 2022 年国庆集卡及 2023 年兔年集金币活动中担任 POC。' },
    { title: '产品从 0 到 1', text: '2024 年起负责抖音精选与抖音健康活动设计，参与精选 App 从 0 到 1 的成长与品牌风格探索。' },
    { title: 'AI 与体验迭代', text: '将 AI 技术应用于活动设计，持续关注上线反馈并快速迭代，提升内容体验的精致度与沉浸感。' }
   ]
  },
  {
   company: '高途课堂', role: '视觉设计师', dates: '2020.08 — 2021.07',
   description: '负责小早启蒙项目运营视觉，同时参与团队指导与设计分享。',
   highlights: [
    { title: '运营视觉', text: '负责 IP、活动长图、H5 与主 KV 等视觉设计，支持项目运营需求。' },
    { title: '团队协作', text: '指导实习生完成设计工作，并定期组织设计分享，促进团队交流与学习。' }
   ]
  }
 ]
};
export const projectCategories = ["UG 活动设计", "抖音精选活动设计", "封面模版设计", "Gate 品牌设计", "WasabiCard 品牌设计", "PPT 设计"];
export const projects = [
 {
  "id": "ug-rabbit",
  "title": "兔年春节 · 集金币赚 88 元",
  "english": "SPRING FESTIVAL · YEAR OF THE RABBIT",
  "category": "UG 活动设计",
  "cover": 4,
  "pages": [
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   3
  ],
  "description": "围绕兔年春节集金币玩法，展示活动主视觉、页面、IP 及组件设计。",
  "tags": [
   "春节增长",
   "活动主视觉",
   "IP 设计"
  ],
  "client": "抖音",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     4,
     5,
     6,
     7,
     8,
     9,
     10
    ]
   },
   {
    "title": "相关章节页",
    "pages": [
     3
    ]
   }
  ]
 },
 {
  "id": "ug-spring",
  "title": "2022 春节 · 温暖中国年",
  "english": "A WARM CHINESE NEW YEAR",
  "category": "UG 活动设计",
  "cover": 11,
  "pages": [
   11,
   12,
   13,
   14,
   15,
   16
  ],
  "description": "春节活动视觉与玩法设计，涵盖主视觉、页面、组件及复盘展示。",
  "tags": [
   "春节活动",
   "玩法设计",
   "视觉系统"
  ],
  "client": "抖音",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     11,
     12,
     13,
     14,
     15,
     16
    ]
   }
  ]
 },
 {
  "id": "ug-national-sheep",
  "title": "国庆养小羊 · 升级领红包",
  "english": "NATIONAL DAY · RAISE A LITTLE SHEEP",
  "category": "UG 活动设计",
  "cover": 19,
  "pages": [
   17,
   18,
   19,
   20,
   21,
   22
  ],
  "description": "以养小羊玩法串联国庆活动，展示设计思路、页面方案与视觉延展。",
  "tags": [
   "国庆增长",
   "互动玩法",
   "活动页面"
  ],
  "client": "抖音",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     17,
     18,
     19,
     20,
     21,
     22
    ]
   }
  ]
 },
 {
  "id": "ug-travel",
  "title": "国庆旅行纪念册",
  "english": "NATIONAL DAY · TRAVEL MEMORIES",
  "category": "UG 活动设计",
  "cover": 23,
  "pages": [
   23,
   24,
   25
  ],
  "description": "将旅行记忆与互动玩法融入国庆活动，以三维场景构建轻松的节日体验。",
  "tags": [
   "旅行纪念",
   "三维场景",
   "互动体验"
  ],
  "client": "抖音",
  "role": "活动 / 三维视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     23,
     24,
     25
    ]
   }
  ]
 },
 {
  "id": "ug-mayday",
  "title": "五一玩法欢乐多 · 宅家养小羊",
  "english": "MAY DAY · STAY HOME AND PLAY",
  "category": "UG 活动设计",
  "cover": 26,
  "pages": [
   26,
   27,
   28
  ],
  "description": "五一养小羊活动主视觉与页面设计，以轻快色彩呈现节日玩法。",
  "tags": [
   "五一活动",
   "三维 IP",
   "页面设计"
  ],
  "client": "抖音",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     26,
     27,
     28
    ]
   }
  ]
 },
 {
  "id": "ug-health-weight",
  "title": "抖音健康 · 做自己体重的主理人",
  "english": "DOUYIN HEALTH · OWN YOUR WELLNESS",
  "category": "抖音精选活动设计",
  "cover": 30,
  "pages": [
   30,
   31
  ],
  "description": "围绕体重管理主题展开活动主视觉与设计思路展示。",
  "tags": [
   "健康主题",
   "活动主视觉",
   "设计思路"
  ],
  "client": "抖音健康",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     30,
     31
    ]
   }
  ]
 },
 {
  "id": "ug-health-growth",
  "title": "抖音健康 · 满级小孩成长守护手册",
  "english": "DOUYIN HEALTH · GROWING TOGETHER",
  "category": "抖音精选活动设计",
  "cover": 32,
  "pages": [
   32,
   33
  ],
  "description": "围绕儿童成长与守护主题，展示活动主视觉及页面、横幅延展。",
  "tags": [
   "成长主题",
   "活动视觉",
   "视觉延展"
  ],
  "client": "抖音健康",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     32,
     33
    ]
   }
  ]
 },
 {
  "id": "ug-goodnight",
  "title": "抖音极速版 · 早晚安小岛",
  "english": "DOUYIN LITE · GOOD NIGHT ISLAND",
  "category": "UG 活动设计",
  "cover": 48,
  "pages": [
   48,
   49,
   50
  ],
  "description": "早晚安小岛的晚安部分设计，涵盖三维主视觉与多套分享卡片样式。",
  "tags": [
   "运营活动",
   "三维场景",
   "分享卡片"
  ],
  "client": "抖音极速版",
  "role": "运营 / 活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     48,
     49,
     50
    ]
   }
  ]
 },
 {
  "id": "ug-music-report",
  "title": "2025 年度听歌报告 · 听见时间的形状",
  "english": "LISTEN TO THE SHAPE OF TIME",
  "category": "抖音精选活动设计",
  "cover": 55,
  "pages": [
   55,
   56,
   57
  ],
  "description": "以小云 IP、磁带与回忆场景构建年度听歌报告，展示主视觉、配色与回忆页面设计。",
  "tags": [
   "年度报告",
   "IP 叙事",
   "H5 设计"
  ],
  "client": "抖音音乐",
  "role": "活动视觉 / H5 设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     55,
     56,
     57
    ]
   }
  ]
 },
 {
  "id": "jx-ai",
  "title": "纯美科学实验 · AI 视觉探索",
  "english": "IMAGINATION · AMPLIFIED BY AI",
  "category": "抖音精选活动设计",
  "cover": 34,
  "pages": [
   34,
   35,
   29
  ],
  "description": "将 AI 引入活动视觉探索，展示主视觉与风格优化前后的设计方案。",
  "tags": [
   "AI 辅助创作",
   "风格探索",
   "活动视觉"
  ],
  "client": "抖音精选",
  "role": "AI 辅助视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     34,
     35
    ]
   },
   {
    "title": "相关章节页",
    "pages": [
     29
    ]
   }
  ]
 },
 {
  "id": "jx-spring",
  "title": "好活整不停",
  "english": "A LITTLE SURPRISE · EVERYWHERE",
  "category": "抖音精选活动设计",
  "cover": 36,
  "pages": [
   36,
   37,
   38,
   39
  ],
  "description": "以奇幻的门、石膏像与积木构建春节创意，展示主视觉、页面与设计探索。",
  "tags": [
   "春节活动",
   "三维设计",
   "创意探索"
  ],
  "client": "抖音精选",
  "role": "活动视觉 / 创意探索",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     36,
     37,
     38,
     39
    ]
   }
  ]
 },
 {
  "id": "jx-school",
  "title": "学校的第二课堂",
  "english": "BACK TO SCHOOL · A FRESH START",
  "category": "抖音精选活动设计",
  "cover": 40,
  "pages": [
   40,
   41
  ],
  "description": "以鲜明色彩、校园与兴趣元素展开内容活动设计，展示主视觉及页面、传播延展。",
  "tags": [
   "兴趣内容",
   "活动主视觉",
   "传播延展"
  ],
  "client": "抖音精选",
  "role": "活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     40,
     41
    ]
   }
  ]
 },
 {
  "id": "jx-heritage",
  "title": "和李子柒看非遗",
  "english": "HERITAGE · SEEN THROUGH A NEW LENS",
  "category": "抖音精选活动设计",
  "cover": 42,
  "pages": [
   42,
   43
  ],
  "description": "围绕李子柒与非遗内容专题，打造主视觉及移动端内容展示。",
  "tags": [
   "内容专题",
   "人物视觉",
   "页面设计"
  ],
  "client": "抖音精选",
  "role": "内容 / 活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     42,
     43
    ]
   }
  ]
 },
 {
  "id": "jx-badges",
  "title": "精选作者 · 创作者荣誉体系",
  "english": "CREATOR RECOGNITION · MADE VISIBLE",
  "category": "抖音精选活动设计",
  "cover": 44,
  "pages": [
   44,
   45,
   46,
   47
  ],
  "description": "以品质感与等级差异构建创作者荣誉体系，展示徽章、权益说明及产品应用。",
  "tags": [
   "徽章设计",
   "三维设计",
   "产品体验"
  ],
  "client": "抖音精选",
  "role": "徽章 / 产品视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     44,
     45,
     46,
     47
    ]
   }
  ]
 },
 {
  "id": "cover-templates",
  "title": "中长视频 · 封面模版设计",
  "english": "MID-LENGTH VIDEO · COVER TEMPLATES",
  "category": "封面模版设计",
  "cover": 51,
  "pages": [
   51,
   52,
   53,
   54
  ],
  "description": "中长视频封面模版设计，完整展示模版主视觉、多题材样式与内容应用。",
  "tags": [
   "内容封面",
   "模版体系",
   "中长视频"
  ],
  "client": "抖音",
  "role": "封面模版 / 内容视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     51,
     52,
     53,
     54
    ]
   }
  ]
 },
 {
  "id": "gate-social",
  "title": "Gate · 品牌宣发运营视觉",
  "english": "GATE · BRAND COMMUNICATION",
  "category": "Gate 品牌设计",
  "cover": 60,
  "pages": [
   60,
   61,
   62,
   63,
   64,
   65,
   66,
   58,
   59
  ],
  "description": "围绕 Gate 品牌展开运营传播设计，展示社交媒体与 LinkedIn 视觉应用。",
  "tags": [
   "品牌宣发",
   "社交传播",
   "运营视觉"
  ],
  "client": "Gate",
  "role": "Web3 品牌视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     60,
     61,
     62,
     63,
     64,
     65,
     66
    ]
   },
   {
    "title": "相关章节页",
    "pages": [
     58,
     59
    ]
   }
  ]
 },
 gateAnnualProject,
 ...gateProjects,
 {
  "id": "gate-airport",
  "title": "Gate · Web3 机场投放",
  "english": "GATE · NOW BOARDING WEB3",
  "category": "Gate 品牌设计",
  "cover": 70,
  "pages": [
   68,
   69,
   70,
   71,
   72,
   73,
   67
  ],
  "description": "机场品牌投放视觉系列，涵盖人物、飞机与降落伞方案及实际场景展示。",
  "tags": [
   "机场投放",
   "品牌传播",
   "三维场景"
  ],
  "client": "Gate",
  "role": "品牌广告 / 三维视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     68,
     69,
     70,
     71,
     72,
     73
    ]
   },
   {
    "title": "相关章节页",
    "pages": [
     67
    ]
   }
  ]
 },
 {
  "id": "gate-cocktail",
  "title": "Gate · Exclusive Cocktail Evening",
  "english": "GATE · EXCLUSIVE COCKTAIL EVENING",
  "category": "Gate 品牌设计",
  "cover": 74,
  "pages": [
   74
  ],
  "description": "以黑金配色与品牌符号呈现 Gate 鸡尾酒晚会主视觉。",
  "tags": [
   "品牌活动",
   "主视觉",
   "黑金材质"
  ],
  "client": "Gate",
  "role": "活动品牌视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     74
    ]
   }
  ]
 },
 {
  "id": "gate-malta",
  "title": "Gate · Malta VIP Dinner",
  "english": "GATE · MALTA EXCLUSIVE VIP DINNER",
  "category": "Gate 品牌设计",
  "cover": 75,
  "pages": [
   75
  ],
  "description": "以蓝色光效与空间化品牌符号构建马耳他 VIP 晚宴主视觉。",
  "tags": [
   "马耳他活动",
   "品牌主视觉",
   "三维材质"
  ],
  "client": "Gate",
  "role": "活动品牌视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     75
    ]
   }
  ]
 },
 {
  "id": "gate-hongkong",
  "title": "Gate · Institutional Circle Hong Kong",
  "english": "GATE · INSTITUTIONAL CIRCLE HONG KONG",
  "category": "Gate 品牌设计",
  "cover": 76,
  "pages": [
   76,
   77
  ],
  "description": "香港品牌活动视觉，覆盖主视觉、邀请函、Luma 活动图与网页应用。",
  "tags": [
   "香港活动",
   "邀请函",
   "页面延展"
  ],
  "client": "Gate",
  "role": "活动视觉 / 传播物料设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     76,
     77
    ]
   }
  ]
 },
 {
  "id": "gatecast",
  "title": "Gatecast · 访谈视觉与场景",
  "english": "GATECAST · A STAGE FOR BIG IDEAS",
  "category": "Gate 品牌设计",
  "cover": 79,
  "pages": [
   79,
   80,
   81
  ],
  "description": "为 Gatecast 访谈构建人物主视觉、录制场景与品牌展示，形成统一传播表达。",
  "tags": [
   "访谈视觉",
   "场景设计",
   "品牌传播"
  ],
  "client": "Gatecast",
  "role": "访谈品牌视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     79,
     80,
     81
    ]
   }
  ]
 },
 {
  "id": "wasabi-upgrade",
  "title": "WasabiCard · 品牌视觉升级",
  "english": "WASABICARD · BRAND DESIGN UPGRADE",
  "category": "WasabiCard 品牌设计",
  "cover": 83,
  "pages": [
   83,
   84,
   82
  ],
  "description": "展示 WasabiCard 品牌概览、视觉升级思路与品牌传播应用。",
  "tags": [
   "品牌升级",
   "视觉体系",
   "设计思路"
  ],
  "client": "WasabiCard",
  "role": "品牌视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     83,
     84
    ]
   },
   {
    "title": "相关章节页",
    "pages": [
     82
    ]
   }
  ]
 },
 {
  "id": "wasabi-social",
  "title": "WasabiCard · 品牌运营与宣发",
  "english": "WASABICARD · BRAND COMMUNICATION",
  "category": "WasabiCard 品牌设计",
  "cover": 85,
  "pages": [
   85,
   86,
   87,
   88,
   89
  ],
  "description": "围绕品牌产品与合作信息构建运营宣发视觉，涵盖社交媒体与 LinkedIn 场景。",
  "tags": [
   "运营宣发",
   "社交传播",
   "品牌视觉"
  ],
  "client": "WasabiCard",
  "role": "品牌 / 传播视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     85,
     86,
     87,
     88,
     89
    ]
   }
  ]
 },
 {
  "id": "wasabi-exhibition",
  "title": "WasabiCard · Stablecoin & Payments 展会",
  "english": "WASABICARD · STABLECOIN & PAYMENTS",
  "category": "WasabiCard 品牌设计",
  "cover": 91,
  "pages": [
   91,
   92,
   93,
   94,
   95,
   90
  ],
  "description": "展会活动视觉系列，完整展示主视觉、嘉宾海报、活动物料与传播应用。",
  "tags": [
   "展会主视觉",
   "嘉宾海报",
   "系列物料"
  ],
  "client": "WasabiCard",
  "role": "展会 / 活动视觉设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     91,
     92,
     93,
     94,
     95
    ]
   },
   {
    "title": "相关章节页",
    "pages": [
     90
    ]
   }
  ]
 },
 {
  "id": "wasabi-merch",
  "title": "WasabiCard · 品牌周边设计",
  "english": "WASABICARD · BRANDED MERCHANDISE",
  "category": "WasabiCard 品牌设计",
  "cover": 96,
  "pages": [
   96,
   97
  ],
  "description": "将品牌视觉延展至服饰、包袋、杯具及其他实物周边，形成统一的品牌体验。",
  "tags": [
   "品牌周边",
   "实物应用",
   "视觉延展"
  ],
  "client": "WasabiCard",
  "role": "品牌周边设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     96,
     97
    ]
   }
  ]
 },
 {
  "id": "wasabi-stickers",
  "title": "WasabiCard · 品牌贴纸设计",
  "english": "WASABICARD · STICKER COLLECTION",
  "category": "WasabiCard 品牌设计",
  "cover": 98,
  "pages": [
   98
  ],
  "description": "以品牌符号与轻快的图形语言构建贴纸系列，延展品牌的日常表达。",
  "tags": [
   "贴纸设计",
   "品牌图形",
   "周边延展"
  ],
  "client": "WasabiCard",
  "role": "品牌图形 / 贴纸设计",
  "chapters": [
   {
    "title": "项目展示",
    "pages": [
     98
    ]
   }
  ]
 },
 ...pptProjects
];
export const portfolioExtras = [
 { page: 1, title: '作品集原始封面' },
 { page: 99, title: '作品集结束页' }
];
const assetBase = n => typeof n === 'number'
 ? `/assets/page-${String(n).padStart(2,'0')}.webp`
 : n.startsWith('gate/') ? `/assets/${n}.webp` : `/assets/ppt/${n}.webp`;
export const asset = assetBase;
export const imageSize = n => typeof n === 'number' ? dimensions[String(n)] : pptDimensions[n] ?? gateDimensions[n];

export const previewProps = n => {
 const path = typeof n === 'number' ? `/assets/previews/page-${String(n).padStart(2, '0')}` : assetBase(n).replace(/\.webp$/, '');
 return {
 src: `${path}-1280.webp`,
 srcSet: `${path}-640.webp 640w, ${path}-1280.webp 1280w`,
 sizes: '(max-width: 600px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 68px) / 2), (max-width: 1812px) calc((100vw - 140px) / 2), 836px',
 decoding: 'async'
 };
};
