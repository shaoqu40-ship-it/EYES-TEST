// --- 核心定义：必须包含 export 关键字 ---
export interface Question {
  id: number;
  text: string;
  subText?: string;
  options: { label: string; value: "A" | "B" | "C" }[];
}

export interface Result {
  id: string;
  title: string;
  age: string;
  tagline: string;
  desc: string;
  tags: string[];
  quote: string;
  img: string;
}
// ------------------------------------

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "你睁开眼，世界尚未完全成形，你看到：",
    subText: "（像梦还没结束）",
    options: [
      { label: "有水光，在缓慢摇曳", value: "A" },
      { label: "有一束光，正落在你身上", value: "B" },
      { label: "只有混沌的轮廓，像未被说出的篇章", value: "C" },
    ],
  },
  {
    id: 2,
    text: "远处有人叫你的名字，声音不急不缓，你会：",
    subText: "（你不确定那是不是为你准备的）",
    options: [
      { label: "你几乎立刻回头", value: "A" },
      { label: "你先分辨它从哪里来", value: "B" },
      { label: "你没有停下", value: "C" },
    ],
  },
  {
    id: 3,
    text: "你走进一间房间，墙上布满眼睛，你看到：",
    subText: "（它们似乎一直在这里）",
    options: [
      { label: "它们一起看向你", value: "A" },
      { label: "其中一双与你对视", value: "B" },
      { label: "它们只是安静存在", value: "C" },
    ],
  },
  {
    id: 4,
    text: "有人靠近，说：“我好像认识你。”你觉得：",
    subText: "（像是在确认一件很久以前的事）",
    options: [
      { label: "你觉得他是真的", value: "A" },
      { label: "你停在不确定之间", value: "B" },
      { label: "你觉得他认错了人", value: "C" },
    ],
  },
  {
    id: 5,
    text: "你触碰到一面镜子，你感到：",
    subText: "（它没有倒影之外的解释）",
    options: [
      { label: "是温的，像刚被人触摸过", value: "A" },
      { label: "是冷的，像夜晚的湖面", value: "B" },
      { label: "没有温度，像不存在", value: "C" },
    ],
  },
  {
    id: 6,
    text: "你记住一个人，是因为：",
    subText: "（不是所有人都会留下痕迹）",
    options: [
      { label: "他的眼神让你动摇了一下", value: "A" },
      { label: "他的眼神让你想了很久", value: "B" },
      { label: "他的眼神很快在你心里就消失了", value: "C" },
    ],
  },
  {
    id: 7,
    text: "你被要求闭上一只眼，你会：",
    subText: "（好像这样才能继续往前）",
    options: [
      { label: "你犹豫了很久", value: "A" },
      { label: "你选了，然后不再回头", value: "B" },
      { label: "你没有感觉", value: "C" },
    ],
  },
  {
    id: 8,
    text: "世界暗下来，只剩下一点光，你会：",
    subText: "（它不大，但足够被看见）",
    options: [
      { label: "你走向它", value: "A" },
      { label: "你停下来观察", value: "B" },
      { label: "你绕开它", value: "C" },
    ],
  },
  {
    id: 9,
    text: "有人与你对视，很久，没有说话。你会：",
    subText: "（时间像被拉长了一点）",
    options: [
      { label: "你先移开目光", value: "A" },
      { label: "你保持着这段对视", value: "B" },
      { label: "你没有回应", value: "C" },
    ],
  },
  {
    id: 10,
    text: "如果你的眼睛会说一句话，它更可能在某个很晚的时刻，说：",
    subText: "（没有人听见的时候）",
    options: [
      { label: "“别走。”", value: "A" },
      { label: "“我在看。”", value: "B" },
      { label: "“没关系。”", value: "C" },
    ],
  },
];

export const RESULTS: Record<string, Result> = {
  primary: {
    id: "primary",
    title: "初生者的眼睛",
    age: "13–16岁",
    tagline: "你的眼睛，还停在情绪发生的那一刻",
    desc: "你的眼睛像一层薄雾，情绪来得快，也留得久。你不是脆弱，而是对世界的感受太直接。",
    tags: ["高敏感", "情绪驱动", "共情强"],
    quote: "「你的眼睛，很容易装下别人。」",
    img: "/images/eye1.png",
  },
  guardian: {
    id: "guardian",
    title: "守望者的眼睛",
    age: "17–22岁",
    tagline: "你的眼睛，在等待被真正看见",
    desc: "你开始理解世界，但还在确认自己。你在意别人是否看懂你，眼神干净，但已经有了层次。",
    tags: ["共情", "细腻", "有期待"],
    quote: "「你不是在看世界，你在等世界回应你。」",
    img: "/images/eye2.png",
  },
  bystander: {
    id: "bystander",
    title: "旁观者的眼睛",
    age: "23–29岁",
    tagline: "你的眼睛，比情绪更早做出判断",
    desc: "你习惯先看，再决定是否靠近。你不轻易动摇，但也没有完全关闭自己。",
    tags: ["冷静", "观察者", "自控"],
    quote: "「你在看，但你不急着被看见。」",
    img: "/images/eye3.png",
  },
  judge: {
    id: "judge",
    title: "判断者的眼睛",
    age: "30–39岁",
    tagline: "你的眼睛，已经学会不被打扰",
    desc: "你不再被瞬间情绪带走。你更在意方向，而不是感觉。你看得很清楚，也知道什么不值得看第二次。",
    tags: ["理性", "边界强", "冷静"],
    quote: "「你看见很多，但选择不回应更多。」",
    img: "/images/eye4.png",
  },
  traveler: {
    id: "traveler",
    title: "旅行者的眼睛",
    age: "40岁+",
    tagline: "你的眼睛，在更远的地方停过",
    desc: "你已经不急着解释世界。很多事情你看过、经历过，也慢慢放下了。你的眼神里有距离，也有余温。",
    tags: ["抽离", "通透", "疏离"],
    quote: "「你不是冷淡，你只是走得更远。」",
    img: "/images/eye5.png",
  },
  conflict: {
    id: "conflict",
    title: "矛盾者的眼睛",
    age: "不稳定",
    tagline: "你的眼睛，一半在靠近，一半在后退",
    desc: "你既敏感又抽离。你一边想靠近，一边在保护自己。",
    tags: ["矛盾", "复杂", "高自我保护"],
    quote: "「你不是看不清，你是看得太清。」",
    img: "/images/eye6.png",
  },
};
