interface ChatIcon {
  meetingCategory: string;
  icon: () => JSX.Element;
}

// 채팅방 svg 아이콘
export const chaticons: ChatIcon[] = [
  {
    meetingCategory: "오락 및 여가",
    icon: () => (
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="55" height="55" fill="url(#pattern0_271_971)" />
        <defs>
          <pattern
            id="pattern0_271_971"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_271_971" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_271_971"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
  },
  {
    meetingCategory: "자연 및 환경",
    icon: () => (
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="55" height="55" fill="url(#pattern0_271_979)" />
        <defs>
          <pattern
            id="pattern0_271_979"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_271_979" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_271_979"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
  },
  {
    meetingCategory: "교육 및 문화",
    icon: () => (
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="55" height="55" fill="url(#pattern0_271_981)" />
        <defs>
          <pattern
            id="pattern0_271_981"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_271_981" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_271_981"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
  },
  {
    meetingCategory: "체험 및 활동",
    icon: () => (
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="55" height="55" fill="url(#pattern0_297_956)" />
        <defs>
          <pattern
            id="pattern0_297_956"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_297_956" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_297_956"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
  },
  {
    meetingCategory: "스포츠 및 운동",
    icon: () => (
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="55" height="55" fill="url(#pattern0_270_969)" />
        <defs>
          <pattern
            id="pattern0_270_969"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_270_969" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_270_969"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
  },
  {
    meetingCategory: "기타",
    icon: () => (
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="55" height="55" fill="url(#pattern0_271_973)" />
        <defs>
          <pattern
            id="pattern0_271_973"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_271_973" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_271_973"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    ),
  },
];
