const componentCommonProps = {
  ali: {
    onClick: 'onTap',
    catchClick: 'catchTap'
  },
  wechat: {
    onClick: 'bindtap',
    catchClick: 'catchtap',
    onLongPress: 'bindlongpress',
    onTouchStart: 'bindtouchstart',
    onTouchEnd: 'bindtouchend',
    onTouchMove: 'bindtouchmove',
    onTouchCancel: 'bindtouchcancel',
  },
  bytedance: {
    onClick: 'bindtap',
    catchClick: 'catchtap',
    onLongPress: 'bindlongpress',
    onTouchStart: 'bindtouchstart',
    onTouchEnd: 'bindtouchend',
    onTouchMove: 'bindtouchmove',
    onTouchCancel: 'bindtouchcancel',
  }
};

/**
 * Extendable
 */
const parserAdapters = {
  'ali': {
    platform: 'ali',
    if: 'a:if',
    else: 'a:else',
    elseif: 'a:elif',
    for: 'a:for',
    forItem: 'a:for-item',
    forIndex: 'a:for-index',
    key: 'a:key',

    view: {
      ...componentCommonProps.ali,
      onLongPress: 'onLongTap',
      className: '__rax-view'
    },
    compatibleText: false,
    // Need transform style & class keyword
    styleKeyword: false,
    // No need to transform onClick -> bindonclick
    needTransformEvent: false,
    slotScope: true,
    // Need transform key
    needTransformKey: false,
    // Handle rax-slider and rax-swiper
    insertSwiperSlot: false,
    // Need register props before program run
    needRegisterProps: false,
  },
  'wechat': {
    platform: 'wechat',
    if: 'wx:if',
    else: 'wx:else',
    elseif: 'wx:elif',
    for: 'wx:for',
    forItem: 'wx:for-item',
    forIndex: 'wx:for-index',
    key: 'wx:key',

    view: {
      ...componentCommonProps.wechat,
      className: '__rax-view'
    },
    compatibleText: false,
    text: {
      ...componentCommonProps.wechat,
      className: '__rax-text'
    },
    styleKeyword: true,
    slotScope: false,
    // Need transform onClick -> bindonclick
    needTransformEvent: true,
    needTransformKey: true,
    triggerRef: true,
    // Handle rax-slider and rax-swiper
    insertSwiperSlot: true,
    needRegisterProps: true,
  },
  'bytedance': {
    platform: 'bytedance',
    if: 'tt:if',
    else: 'tt:else',
    elseif: 'tt:elif',
    for: 'tt:for',
    forItem: 'tt:for-item',
    forIndex: 'tt:for-index',
    key: 'tt:key',

    view: {
      ...componentCommonProps.bytedance,
      className: '__rax-view'
    },
    compatibleText: false,
    text: {
      ...componentCommonProps.bytedance,
      className: '__rax-text'
    },
    styleKeyword: true,
    slotScope: false,
    // Need transform onClick -> bindonclick
    needTransformEvent: true,
    needTransformKey: true,
    triggerRef: true,
    // Handle rax-slider and rax-swiper
    insertSwiperSlot: true,
    needRegisterProps: true,
    // ComponentTag don't support that start with '_'.
    compTagHeadNoUnderline: true
  },
  componentCommonProps
};

module.exports = parserAdapters;
