import { chaticons } from "../assets/chaticon";

// 카테고리마다 다른 아이콘 렌더링해주는 함수
export const getIcon = (category: string) => {
  const icon = chaticons.find(
    (icon) => icon.category === category
  );
  return icon ? icon.icon() : null;
};
