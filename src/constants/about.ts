export interface IAboutPanel {
  text: string;
  bgUrl: string;
  bgDesc: string;
}

export const aboutPanels: IAboutPanel[] = [
  {
    text:
      '안녕하세요. 여러분은 지금 개발자가 되고자 하는 비전공 무경력자의 포트폴리오를 보고 있어요. 만약 여기서 창을 닫지 않았다면 계속 읽어주세요.',
    bgUrl: 'welding.jpg',
    bgDesc: '경기도 작업 현장',
  },
  {
    text: '저는 용접사였어요.',
    bgUrl: 'portafilter.jpg',
    bgDesc:
      'Photo by <a href="https://unsplash.com/@davelundgren?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" style="{ color: `white` }" >David Lundgren</a> on <a href="https://unsplash.com/s/photos/portafilter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>',
  },
  {
    text: '바리스타였던 적도 있어요. 프랜차이즈 커피 전문점 부점장이었죠.',
    bgUrl: 'bicycle.jpg',
    bgDesc: '몽골',
  },
  {
    text: '그리고 자전거로 서울에서 모로코까지 갔다 왔어요. 2년이 걸렸고,',
    bgUrl: 'bicycle.jpg',
    bgDesc: '',
  },
];
