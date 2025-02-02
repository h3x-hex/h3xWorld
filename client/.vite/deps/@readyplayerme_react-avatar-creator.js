import {
  require_react
} from "./chunk-QTVD6AVW.js";
import {
  __toESM
} from "./chunk-PR4QN5HX.js";

// node_modules/@readyplayerme/react-avatar-creator/dist/index.esm.js
var import_react = __toESM(require_react());
var JSONTryParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return void 0;
  }
};
var useAvatarCreatorUrl = (subdomain, config) => {
  return (0, import_react.useMemo)(() => {
    let url = `https://${subdomain || `demo`}.readyplayer.me`;
    if (config == null ? void 0 : config.language)
      url += `/${config.language}`;
    url += `/avatar?frameApi`;
    if (config == null ? void 0 : config.clearCache)
      url += "&clearCache";
    if (config == null ? void 0 : config.quickStart)
      url += "&quickStart";
    if (config == null ? void 0 : config.bodyType)
      url += `&bodyType=${config == null ? void 0 : config.bodyType}`;
    return url;
  }, [subdomain, config]);
};
var MESSAGE_EVENT = "message";
var RPM_TARGET = "readyplayerme";
var IFRAME_READY_EVENT = "v1.frame.ready";
var AvatarCreatorRaw = ({ subdomain, className, style, config, onEventReceived }) => {
  const frameRef = (0, import_react.useRef)(null);
  const url = useAvatarCreatorUrl(subdomain, config);
  const subscribeToAvatarCreatorEvents = () => {
    var _a, _b, _c;
    if (!((_a = frameRef.current) == null ? void 0 : _a.contentWindow))
      return;
    (_c = (_b = frameRef.current) == null ? void 0 : _b.contentWindow) == null ? void 0 : _c.postMessage(JSON.stringify({
      target: RPM_TARGET,
      type: "subscribe",
      eventName: "v1.**"
    }), "*");
  };
  const subscribe = (event) => {
    const avatarCreatorEvent = JSONTryParse(event.data);
    if ((avatarCreatorEvent == null ? void 0 : avatarCreatorEvent.source) !== RPM_TARGET)
      return;
    if ((avatarCreatorEvent == null ? void 0 : avatarCreatorEvent.eventName) === IFRAME_READY_EVENT) {
      subscribeToAvatarCreatorEvents();
      return;
    }
    onEventReceived == null ? void 0 : onEventReceived(avatarCreatorEvent);
  };
  (0, import_react.useEffect)(() => {
    window.addEventListener(MESSAGE_EVENT, subscribe);
    return () => {
      window.removeEventListener(MESSAGE_EVENT, subscribe);
    };
  }, []);
  return import_react.default.createElement("iframe", { title: "Ready Player Me", ref: frameRef, src: url, style, className, allow: "camera *; clipboard-write" });
};
var AvatarCreator = ({ subdomain, className, style, config, onUserSet, onAvatarExported, onUserAuthorized, onAssetUnlock }) => {
  const supportedEvents = {
    "v1.avatar.exported": onAvatarExported,
    "v1.user.set": onUserSet,
    "v1.user.authorized": onUserAuthorized,
    "v1.asset.unlock": onAssetUnlock
  };
  const handleEvents = (event) => {
    var _a;
    (_a = supportedEvents[event.eventName]) == null ? void 0 : _a.call(supportedEvents, event);
  };
  return import_react.default.createElement(AvatarCreatorRaw, { subdomain, className, style, config, onEventReceived: handleEvents });
};
export {
  AvatarCreator,
  AvatarCreatorRaw
};
//# sourceMappingURL=@readyplayerme_react-avatar-creator.js.map
