import {
  require_classnames
} from "./chunk-R4GYP2BA.js";
import {
  require_prop_types
} from "./chunk-544NMATE.js";
import {
  require_react_dom
} from "./chunk-FBRNPY62.js";
import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-CEQRFMJQ.js";

// node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
var react_lifecycles_compat_es_exports = {};
__export(react_lifecycles_compat_es_exports, {
  polyfill: () => polyfill
});
function componentWillMount() {
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== void 0) {
    this.setState(state);
  }
}
function componentWillReceiveProps(nextProps) {
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== void 0 ? state : null;
  }
  this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}
function polyfill(Component) {
  var prototype = Component.prototype;
  if (!prototype || !prototype.isReactComponent) {
    throw new Error("Can only polyfill class components");
  }
  if (typeof Component.getDerivedStateFromProps !== "function" && typeof prototype.getSnapshotBeforeUpdate !== "function") {
    return Component;
  }
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === "function") {
    foundWillMountName = "componentWillMount";
  } else if (typeof prototype.UNSAFE_componentWillMount === "function") {
    foundWillMountName = "UNSAFE_componentWillMount";
  }
  if (typeof prototype.componentWillReceiveProps === "function") {
    foundWillReceivePropsName = "componentWillReceiveProps";
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === "function") {
    foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
  }
  if (typeof prototype.componentWillUpdate === "function") {
    foundWillUpdateName = "componentWillUpdate";
  } else if (typeof prototype.UNSAFE_componentWillUpdate === "function") {
    foundWillUpdateName = "UNSAFE_componentWillUpdate";
  }
  if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
    var componentName = Component.displayName || Component.name;
    var newApiName = typeof Component.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
    throw Error(
      "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + newApiName + " but also contains the following legacy lifecycles:" + (foundWillMountName !== null ? "\n  " + foundWillMountName : "") + (foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "") + (foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks"
    );
  }
  if (typeof Component.getDerivedStateFromProps === "function") {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }
  if (typeof prototype.getSnapshotBeforeUpdate === "function") {
    if (typeof prototype.componentDidUpdate !== "function") {
      throw new Error(
        "Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype"
      );
    }
    prototype.componentWillUpdate = componentWillUpdate;
    var componentDidUpdate = prototype.componentDidUpdate;
    prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
      var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }
  return Component;
}
var init_react_lifecycles_compat_es = __esm({
  "node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js"() {
    componentWillMount.__suppressDeprecationWarning = true;
    componentWillReceiveProps.__suppressDeprecationWarning = true;
    componentWillUpdate.__suppressDeprecationWarning = true;
  }
});

// node_modules/react-transition-group/utils/ChildMapping.js
var require_ChildMapping = __commonJS({
  "node_modules/react-transition-group/utils/ChildMapping.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.getChildMapping = getChildMapping;
    exports.mergeChildMappings = mergeChildMappings;
    exports.getInitialChildMapping = getInitialChildMapping;
    exports.getNextChildMapping = getNextChildMapping;
    var _react = require_react();
    function getChildMapping(children, mapFn) {
      var mapper = function mapper2(child) {
        return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
      };
      var result = /* @__PURE__ */ Object.create(null);
      if (children)
        _react.Children.map(children, function(c) {
          return c;
        }).forEach(function(child) {
          result[child.key] = mapper(child);
        });
      return result;
    }
    function mergeChildMappings(prev, next) {
      prev = prev || {};
      next = next || {};
      function getValueForKey(key) {
        return key in next ? next[key] : prev[key];
      }
      var nextKeysPending = /* @__PURE__ */ Object.create(null);
      var pendingKeys = [];
      for (var prevKey in prev) {
        if (prevKey in next) {
          if (pendingKeys.length) {
            nextKeysPending[prevKey] = pendingKeys;
            pendingKeys = [];
          }
        } else {
          pendingKeys.push(prevKey);
        }
      }
      var i;
      var childMapping = {};
      for (var nextKey in next) {
        if (nextKeysPending[nextKey]) {
          for (i = 0; i < nextKeysPending[nextKey].length; i++) {
            var pendingNextKey = nextKeysPending[nextKey][i];
            childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
          }
        }
        childMapping[nextKey] = getValueForKey(nextKey);
      }
      for (i = 0; i < pendingKeys.length; i++) {
        childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
      }
      return childMapping;
    }
    function getProp(child, prop, props) {
      return props[prop] != null ? props[prop] : child.props[prop];
    }
    function getInitialChildMapping(props, onExited) {
      return getChildMapping(props.children, function(child) {
        return (0, _react.cloneElement)(child, {
          onExited: onExited.bind(null, child),
          in: true,
          appear: getProp(child, "appear", props),
          enter: getProp(child, "enter", props),
          exit: getProp(child, "exit", props)
        });
      });
    }
    function getNextChildMapping(nextProps, prevChildMapping, onExited) {
      var nextChildMapping = getChildMapping(nextProps.children);
      var children = mergeChildMappings(prevChildMapping, nextChildMapping);
      Object.keys(children).forEach(function(key) {
        var child = children[key];
        if (!(0, _react.isValidElement)(child))
          return;
        var hasPrev = key in prevChildMapping;
        var hasNext = key in nextChildMapping;
        var prevChild = prevChildMapping[key];
        var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in;
        if (hasNext && (!hasPrev || isLeaving)) {
          children[key] = (0, _react.cloneElement)(child, {
            onExited: onExited.bind(null, child),
            in: true,
            exit: getProp(child, "exit", nextProps),
            enter: getProp(child, "enter", nextProps)
          });
        } else if (!hasNext && hasPrev && !isLeaving) {
          children[key] = (0, _react.cloneElement)(child, {
            in: false
          });
        } else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
          children[key] = (0, _react.cloneElement)(child, {
            onExited: onExited.bind(null, child),
            in: prevChild.props.in,
            exit: getProp(child, "exit", nextProps),
            enter: getProp(child, "enter", nextProps)
          });
        }
      });
      return children;
    }
  }
});

// node_modules/react-transition-group/TransitionGroup.js
var require_TransitionGroup = __commonJS({
  "node_modules/react-transition-group/TransitionGroup.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports.default = void 0;
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react = _interopRequireDefault(require_react());
    var _reactLifecyclesCompat = (init_react_lifecycles_compat_es(), __toCommonJS(react_lifecycles_compat_es_exports));
    var _ChildMapping = require_ChildMapping();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    var values = Object.values || function(obj) {
      return Object.keys(obj).map(function(k) {
        return obj[k];
      });
    };
    var defaultProps = {
      component: "div",
      childFactory: function childFactory(child) {
        return child;
      }
      /**
       * The `<TransitionGroup>` component manages a set of transition components
       * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
       * components, `<TransitionGroup>` is a state machine for managing the mounting
       * and unmounting of components over time.
       *
       * Consider the example below. As items are removed or added to the TodoList the
       * `in` prop is toggled automatically by the `<TransitionGroup>`.
       *
       * Note that `<TransitionGroup>`  does not define any animation behavior!
       * Exactly _how_ a list item animates is up to the individual transition
       * component. This means you can mix and match animations across different list
       * items.
       */
    };
    var TransitionGroup = function(_React$Component) {
      _inheritsLoose(TransitionGroup2, _React$Component);
      function TransitionGroup2(props, context) {
        var _this;
        _this = _React$Component.call(this, props, context) || this;
        var handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          handleExited,
          firstRender: true
        };
        return _this;
      }
      var _proto = TransitionGroup2.prototype;
      _proto.getChildContext = function getChildContext() {
        return {
          transitionGroup: {
            isMounting: !this.appeared
          }
        };
      };
      _proto.componentDidMount = function componentDidMount() {
        this.appeared = true;
        this.mounted = true;
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
      };
      TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
        var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
        return {
          children: firstRender ? (0, _ChildMapping.getInitialChildMapping)(nextProps, handleExited) : (0, _ChildMapping.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
          firstRender: false
        };
      };
      _proto.handleExited = function handleExited(child, node) {
        var currentChildMapping = (0, _ChildMapping.getChildMapping)(this.props.children);
        if (child.key in currentChildMapping)
          return;
        if (child.props.onExited) {
          child.props.onExited(node);
        }
        if (this.mounted) {
          this.setState(function(state) {
            var children = _extends({}, state.children);
            delete children[child.key];
            return {
              children
            };
          });
        }
      };
      _proto.render = function render() {
        var _this$props = this.props, Component = _this$props.component, childFactory = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
        var children = values(this.state.children).map(childFactory);
        delete props.appear;
        delete props.enter;
        delete props.exit;
        if (Component === null) {
          return children;
        }
        return _react.default.createElement(Component, props, children);
      };
      return TransitionGroup2;
    }(_react.default.Component);
    TransitionGroup.childContextTypes = {
      transitionGroup: _propTypes.default.object.isRequired
    };
    TransitionGroup.propTypes = true ? {
      /**
       * `<TransitionGroup>` renders a `<div>` by default. You can change this
       * behavior by providing a `component` prop.
       * If you use React v16+ and would like to avoid a wrapping `<div>` element
       * you can pass in `component={null}`. This is useful if the wrapping div
       * borks your css styles.
       */
      component: _propTypes.default.any,
      /**
       * A set of `<Transition>` components, that are toggled `in` and out as they
       * leave. the `<TransitionGroup>` will inject specific transition props, so
       * remember to spread them through if you are wrapping the `<Transition>` as
       * with our `<Fade>` example.
       *
       * While this component is meant for multiple `Transition` or `CSSTransition`
       * children, sometimes you may want to have a single transition child with
       * content that you want to be transitioned out and in when you change it
       * (e.g. routes, images etc.) In that case you can change the `key` prop of
       * the transition child as you change its content, this will cause
       * `TransitionGroup` to transition the child out and back in.
       */
      children: _propTypes.default.node,
      /**
       * A convenience prop that enables or disables appear animations
       * for all children. Note that specifying this will override any defaults set
       * on individual children Transitions.
       */
      appear: _propTypes.default.bool,
      /**
       * A convenience prop that enables or disables enter animations
       * for all children. Note that specifying this will override any defaults set
       * on individual children Transitions.
       */
      enter: _propTypes.default.bool,
      /**
       * A convenience prop that enables or disables exit animations
       * for all children. Note that specifying this will override any defaults set
       * on individual children Transitions.
       */
      exit: _propTypes.default.bool,
      /**
       * You may need to apply reactive updates to a child as it is exiting.
       * This is generally done by using `cloneElement` however in the case of an exiting
       * child the element has already been removed and not accessible to the consumer.
       *
       * If you do need to update a child as it leaves you can provide a `childFactory`
       * to wrap every child, even the ones that are leaving.
       *
       * @type Function(child: ReactElement) -> ReactElement
       */
      childFactory: _propTypes.default.func
    } : {};
    TransitionGroup.defaultProps = defaultProps;
    var _default = (0, _reactLifecyclesCompat.polyfill)(TransitionGroup);
    exports.default = _default;
    module.exports = exports["default"];
  }
});

// node_modules/react-toastify/lib/utils/constant.js
var require_constant = __commonJS({
  "node_modules/react-toastify/lib/utils/constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var POSITION = exports.POSITION = {
      TOP_LEFT: "top-left",
      TOP_RIGHT: "top-right",
      TOP_CENTER: "top-center",
      BOTTOM_LEFT: "bottom-left",
      BOTTOM_RIGHT: "bottom-right",
      BOTTOM_CENTER: "bottom-center"
    };
    var TYPE = exports.TYPE = {
      INFO: "info",
      SUCCESS: "success",
      WARNING: "warning",
      ERROR: "error",
      DEFAULT: "default"
    };
    var ACTION = exports.ACTION = {
      SHOW: "SHOW_TOAST",
      CLEAR: "CLEAR_TOAST",
      MOUNTED: "CONTAINER_MOUNTED",
      ON_CHANGE: "ON_CHANGE"
    };
  }
});

// node_modules/react-toastify/lib/components/ProgressBar.js
var require_ProgressBar = __commonJS({
  "node_modules/react-toastify/lib/components/ProgressBar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _classnames = require_classnames();
    var _classnames2 = _interopRequireDefault(_classnames);
    var _constant = require_constant();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function ProgressBar(_ref) {
      var delay = _ref.delay, isRunning = _ref.isRunning, closeToast = _ref.closeToast, type = _ref.type, hide = _ref.hide, className = _ref.className, rtl = _ref.rtl;
      var style = {
        animationDuration: delay + "ms",
        animationPlayState: isRunning ? "running" : "paused",
        opacity: hide ? 0 : 1
      };
      var classNames = (0, _classnames2.default)("Toastify__progress-bar", "Toastify__progress-bar--" + type, {
        "Toastify__progress-bar--rtl": rtl
      }, className);
      return _react2.default.createElement("div", { className: classNames, style, onAnimationEnd: closeToast });
    }
    ProgressBar.propTypes = {
      /**
       * The animation delay which determine when to close the toast
       */
      delay: _propTypes2.default.number.isRequired,
      /**
       * Whether or not the animation is running or paused
       */
      isRunning: _propTypes2.default.bool.isRequired,
      /**
       * Func to close the current toast
       */
      closeToast: _propTypes2.default.func.isRequired,
      /**
       * Support rtl content
       */
      rtl: _propTypes2.default.bool.isRequired,
      /**
       * Optional type : info, success ...
       */
      type: _propTypes2.default.string,
      /**
       * Hide or not the progress bar
       */
      hide: _propTypes2.default.bool,
      /**
       * Optionnal className
       */
      className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
    };
    ProgressBar.defaultProps = {
      type: _constant.TYPE.DEFAULT,
      hide: false
    };
    exports.default = ProgressBar;
  }
});

// node_modules/react-toastify/lib/utils/propValidator.js
var require_propValidator = __commonJS({
  "node_modules/react-toastify/lib/utils/propValidator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.falseOrElement = exports.falseOrDelay = void 0;
    exports.isValidDelay = isValidDelay;
    exports.objectValues = objectValues;
    var _react = require_react();
    function isValidDelay(val) {
      return typeof val === "number" && !isNaN(val) && val > 0;
    }
    function objectValues(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    }
    function withRequired(fn) {
      fn.isRequired = function(props, propName, componentName) {
        var prop = props[propName];
        if (typeof prop === "undefined") {
          return new Error("The prop " + propName + " is marked as required in \n      " + componentName + ", but its value is undefined.");
        }
        fn(props, propName, componentName);
      };
      return fn;
    }
    var falseOrDelay = exports.falseOrDelay = withRequired(function(props, propName, componentName) {
      var prop = props[propName];
      if (prop !== false && !isValidDelay(prop)) {
        return new Error(componentName + " expect " + propName + " \n      to be a valid Number > 0 or equal to false. " + prop + " given.");
      }
      return null;
    });
    var falseOrElement = exports.falseOrElement = withRequired(function(props, propName, componentName) {
      var prop = props[propName];
      if (prop !== false && !(0, _react.isValidElement)(prop)) {
        return new Error(componentName + " expect " + propName + " \n      to be a valid react element or equal to false. " + prop + " given.");
      }
      return null;
    });
  }
});

// node_modules/react-toastify/lib/components/Toast.js
var require_Toast = __commonJS({
  "node_modules/react-toastify/lib/components/Toast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _classnames = require_classnames();
    var _classnames2 = _interopRequireDefault(_classnames);
    var _ProgressBar = require_ProgressBar();
    var _ProgressBar2 = _interopRequireDefault(_ProgressBar);
    var _constant = require_constant();
    var _propValidator = require_propValidator();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function getX(e) {
      return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientX : e.clientX;
    }
    function getY(e) {
      return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientY : e.clientY;
    }
    var noop = function noop2() {
    };
    var Toast = function(_Component) {
      _inherits(Toast2, _Component);
      function Toast2() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Toast2);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast2.__proto__ || Object.getPrototypeOf(Toast2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          isRunning: true,
          preventExitTransition: false
        }, _this.flag = {
          canCloseOnClick: true,
          canDrag: false
        }, _this.drag = {
          start: 0,
          x: 0,
          y: 0,
          deltaX: 0,
          removalDistance: 0
        }, _this.ref = null, _this.pauseToast = function() {
          _this.setState({ isRunning: false });
        }, _this.playToast = function() {
          _this.setState({ isRunning: true });
        }, _this.onDragStart = function(e) {
          _this.flag.canCloseOnClick = true;
          _this.flag.canDrag = true;
          _this.ref.style.transition = "";
          _this.drag.start = _this.drag.x = getX(e.nativeEvent);
          _this.drag.removalDistance = _this.ref.offsetWidth * (_this.props.draggablePercent / 100);
        }, _this.onDragMove = function(e) {
          if (_this.flag.canDrag) {
            if (_this.state.isRunning) {
              _this.pauseToast();
            }
            _this.drag.x = getX(e);
            _this.drag.deltaX = _this.drag.x - _this.drag.start;
            _this.drag.start !== _this.drag.x && (_this.flag.canCloseOnClick = false);
            _this.ref.style.transform = "translateX(" + _this.drag.deltaX + "px)";
            _this.ref.style.opacity = 1 - Math.abs(_this.drag.deltaX / _this.drag.removalDistance);
          }
        }, _this.onDragEnd = function(e) {
          if (_this.flag.canDrag) {
            _this.flag.canDrag = false;
            if (Math.abs(_this.drag.deltaX) > _this.drag.removalDistance) {
              _this.setState({
                preventExitTransition: true
              }, _this.props.closeToast);
              return;
            }
            _this.drag.y = getY(e);
            _this.ref.style.transition = "transform 0.2s, opacity 0.2s";
            _this.ref.style.transform = "translateX(0)";
            _this.ref.style.opacity = 1;
          }
        }, _this.onDragTransitionEnd = function() {
          var _this$ref$getBounding = _this.ref.getBoundingClientRect(), top = _this$ref$getBounding.top, bottom = _this$ref$getBounding.bottom, left = _this$ref$getBounding.left, right = _this$ref$getBounding.right;
          if (_this.props.pauseOnHover && _this.drag.x >= left && _this.drag.x <= right && _this.drag.y >= top && _this.drag.y <= bottom) {
            _this.pauseToast();
          } else {
            _this.playToast();
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(Toast2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onOpen(this.props.children.props);
          if (this.props.draggable) {
            this.bindDragEvents();
          }
        }
      }, {
        key: "bindDragEvents",
        value: function bindDragEvents() {
          document.addEventListener("mousemove", this.onDragMove);
          document.addEventListener("mouseup", this.onDragEnd);
          document.addEventListener("touchmove", this.onDragMove);
          document.addEventListener("touchend", this.onDragEnd);
        }
      }, {
        key: "unbindDragEvents",
        value: function unbindDragEvents() {
          document.removeEventListener("mousemove", this.onDragMove);
          document.removeEventListener("mouseup", this.onDragEnd);
          document.removeEventListener("touchmove", this.onDragMove);
          document.removeEventListener("touchend", this.onDragEnd);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (prevProps.draggable !== this.props.draggable) {
            this.props.draggable ? this.bindDragEvents() : this.unbindDragEvents();
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.props.onClose(this.props.children.props);
          if (this.props.draggable) {
            this.unbindDragEvents();
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;
          var _props = this.props, closeButton = _props.closeButton, children = _props.children, autoClose = _props.autoClose, pauseOnHover = _props.pauseOnHover, closeOnClick = _props.closeOnClick, type = _props.type, hideProgressBar = _props.hideProgressBar, closeToast = _props.closeToast, Transition = _props.transition, position = _props.position, onExited = _props.onExited, className = _props.className, bodyClassName = _props.bodyClassName, progressClassName = _props.progressClassName, updateId = _props.updateId, role = _props.role, rtl = _props.rtl;
          var toastProps = {
            className: (0, _classnames2.default)("Toastify__toast", "Toastify__toast--" + type, {
              "Toastify__toast--rtl": rtl
            }, className)
          };
          if (autoClose && pauseOnHover) {
            toastProps.onMouseEnter = this.pauseToast;
            toastProps.onMouseLeave = this.playToast;
          }
          if (closeOnClick) {
            toastProps.onClick = function() {
              return _this2.flag.canCloseOnClick && closeToast();
            };
          }
          return _react2.default.createElement(
            Transition,
            {
              "in": this.props.in,
              appear: true,
              unmountOnExit: true,
              onExited,
              position,
              preventExitTransition: this.state.preventExitTransition
            },
            _react2.default.createElement(
              "div",
              _extends({}, toastProps, {
                ref: function ref(_ref2) {
                  return _this2.ref = _ref2;
                },
                onMouseDown: this.onDragStart,
                onTouchStart: this.onDragStart,
                onTransitionEnd: this.onDragTransitionEnd
              }),
              _react2.default.createElement(
                "div",
                _extends({}, this.props.in && { role }, {
                  className: (0, _classnames2.default)("Toastify__toast-body", bodyClassName)
                }),
                children
              ),
              closeButton !== false && closeButton,
              autoClose !== false && _react2.default.createElement(_ProgressBar2.default, _extends({}, updateId ? { key: "pb-" + updateId } : {}, {
                rtl,
                delay: autoClose,
                isRunning: this.state.isRunning,
                closeToast,
                hide: hideProgressBar,
                type,
                className: progressClassName
              }))
            )
          );
        }
      }]);
      return Toast2;
    }(_react.Component);
    Toast.propTypes = {
      closeButton: _propValidator.falseOrElement.isRequired,
      autoClose: _propValidator.falseOrDelay.isRequired,
      children: _propTypes2.default.node.isRequired,
      closeToast: _propTypes2.default.func.isRequired,
      position: _propTypes2.default.oneOf((0, _propValidator.objectValues)(_constant.POSITION)).isRequired,
      pauseOnHover: _propTypes2.default.bool.isRequired,
      closeOnClick: _propTypes2.default.bool.isRequired,
      transition: _propTypes2.default.func.isRequired,
      isDocumentHidden: _propTypes2.default.bool.isRequired,
      rtl: _propTypes2.default.bool.isRequired,
      hideProgressBar: _propTypes2.default.bool.isRequired,
      draggable: _propTypes2.default.bool.isRequired,
      draggablePercent: _propTypes2.default.number.isRequired,
      in: _propTypes2.default.bool,
      onExited: _propTypes2.default.func,
      onOpen: _propTypes2.default.func,
      onClose: _propTypes2.default.func,
      type: _propTypes2.default.oneOf((0, _propValidator.objectValues)(_constant.TYPE)),
      className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      bodyClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      progressClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      updateId: _propTypes2.default.number,
      ariaLabel: _propTypes2.default.string
    };
    Toast.defaultProps = {
      type: _constant.TYPE.DEFAULT,
      in: true,
      onOpen: noop,
      onClose: noop,
      className: null,
      bodyClassName: null,
      progressClassName: null,
      updateId: null,
      role: "alert"
    };
    exports.default = Toast;
  }
});

// node_modules/react-toastify/lib/components/CloseButton.js
var require_CloseButton = __commonJS({
  "node_modules/react-toastify/lib/components/CloseButton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function CloseButton(_ref) {
      var closeToast = _ref.closeToast, type = _ref.type, ariaLabel = _ref.ariaLabel;
      return _react2.default.createElement(
        "button",
        {
          className: "Toastify__close-button Toastify__close-button--" + type,
          type: "button",
          onClick: closeToast,
          "aria-label": ariaLabel
        },
        "✖"
      );
    }
    CloseButton.propTypes = {
      closeToast: _propTypes2.default.func,
      arialLabel: _propTypes2.default.string
    };
    CloseButton.defaultProps = {
      ariaLabel: "close"
    };
    exports.default = CloseButton;
  }
});

// node_modules/react-transition-group/utils/PropTypes.js
var require_PropTypes = __commonJS({
  "node_modules/react-transition-group/utils/PropTypes.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.classNamesShape = exports.timeoutsShape = void 0;
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var timeoutsShape = true ? _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
      enter: _propTypes.default.number,
      exit: _propTypes.default.number,
      appear: _propTypes.default.number
    }).isRequired]) : null;
    exports.timeoutsShape = timeoutsShape;
    var classNamesShape = true ? _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
      enter: _propTypes.default.string,
      exit: _propTypes.default.string,
      active: _propTypes.default.string
    }), _propTypes.default.shape({
      enter: _propTypes.default.string,
      enterDone: _propTypes.default.string,
      enterActive: _propTypes.default.string,
      exit: _propTypes.default.string,
      exitDone: _propTypes.default.string,
      exitActive: _propTypes.default.string
    })]) : null;
    exports.classNamesShape = classNamesShape;
  }
});

// node_modules/react-transition-group/Transition.js
var require_Transition = __commonJS({
  "node_modules/react-transition-group/Transition.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.default = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;
    var PropTypes = _interopRequireWildcard(require_prop_types());
    var _react = _interopRequireDefault(require_react());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _reactLifecyclesCompat = (init_react_lifecycles_compat_es(), __toCommonJS(react_lifecycles_compat_es_exports));
    var _PropTypes = require_PropTypes();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var UNMOUNTED = "unmounted";
    exports.UNMOUNTED = UNMOUNTED;
    var EXITED = "exited";
    exports.EXITED = EXITED;
    var ENTERING = "entering";
    exports.ENTERING = ENTERING;
    var ENTERED = "entered";
    exports.ENTERED = ENTERED;
    var EXITING = "exiting";
    exports.EXITING = EXITING;
    var Transition = function(_React$Component) {
      _inheritsLoose(Transition2, _React$Component);
      function Transition2(props, context) {
        var _this;
        _this = _React$Component.call(this, props, context) || this;
        var parentGroup = context.transitionGroup;
        var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
        var initialStatus;
        _this.appearStatus = null;
        if (props.in) {
          if (appear) {
            initialStatus = EXITED;
            _this.appearStatus = ENTERING;
          } else {
            initialStatus = ENTERED;
          }
        } else {
          if (props.unmountOnExit || props.mountOnEnter) {
            initialStatus = UNMOUNTED;
          } else {
            initialStatus = EXITED;
          }
        }
        _this.state = {
          status: initialStatus
        };
        _this.nextCallback = null;
        return _this;
      }
      var _proto = Transition2.prototype;
      _proto.getChildContext = function getChildContext() {
        return {
          transitionGroup: null
          // allows for nested Transitions
        };
      };
      Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
        var nextIn = _ref.in;
        if (nextIn && prevState.status === UNMOUNTED) {
          return {
            status: EXITED
          };
        }
        return null;
      };
      _proto.componentDidMount = function componentDidMount() {
        this.updateStatus(true, this.appearStatus);
      };
      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        var nextStatus = null;
        if (prevProps !== this.props) {
          var status = this.state.status;
          if (this.props.in) {
            if (status !== ENTERING && status !== ENTERED) {
              nextStatus = ENTERING;
            }
          } else {
            if (status === ENTERING || status === ENTERED) {
              nextStatus = EXITING;
            }
          }
        }
        this.updateStatus(false, nextStatus);
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.cancelNextCallback();
      };
      _proto.getTimeouts = function getTimeouts() {
        var timeout = this.props.timeout;
        var exit, enter, appear;
        exit = enter = appear = timeout;
        if (timeout != null && typeof timeout !== "number") {
          exit = timeout.exit;
          enter = timeout.enter;
          appear = timeout.appear !== void 0 ? timeout.appear : enter;
        }
        return {
          exit,
          enter,
          appear
        };
      };
      _proto.updateStatus = function updateStatus(mounting, nextStatus) {
        if (mounting === void 0) {
          mounting = false;
        }
        if (nextStatus !== null) {
          this.cancelNextCallback();
          var node = _reactDom.default.findDOMNode(this);
          if (nextStatus === ENTERING) {
            this.performEnter(node, mounting);
          } else {
            this.performExit(node);
          }
        } else if (this.props.unmountOnExit && this.state.status === EXITED) {
          this.setState({
            status: UNMOUNTED
          });
        }
      };
      _proto.performEnter = function performEnter(node, mounting) {
        var _this2 = this;
        var enter = this.props.enter;
        var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
        var timeouts = this.getTimeouts();
        var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
        if (!mounting && !enter) {
          this.safeSetState({
            status: ENTERED
          }, function() {
            _this2.props.onEntered(node);
          });
          return;
        }
        this.props.onEnter(node, appearing);
        this.safeSetState({
          status: ENTERING
        }, function() {
          _this2.props.onEntering(node, appearing);
          _this2.onTransitionEnd(node, enterTimeout, function() {
            _this2.safeSetState({
              status: ENTERED
            }, function() {
              _this2.props.onEntered(node, appearing);
            });
          });
        });
      };
      _proto.performExit = function performExit(node) {
        var _this3 = this;
        var exit = this.props.exit;
        var timeouts = this.getTimeouts();
        if (!exit) {
          this.safeSetState({
            status: EXITED
          }, function() {
            _this3.props.onExited(node);
          });
          return;
        }
        this.props.onExit(node);
        this.safeSetState({
          status: EXITING
        }, function() {
          _this3.props.onExiting(node);
          _this3.onTransitionEnd(node, timeouts.exit, function() {
            _this3.safeSetState({
              status: EXITED
            }, function() {
              _this3.props.onExited(node);
            });
          });
        });
      };
      _proto.cancelNextCallback = function cancelNextCallback() {
        if (this.nextCallback !== null) {
          this.nextCallback.cancel();
          this.nextCallback = null;
        }
      };
      _proto.safeSetState = function safeSetState(nextState, callback) {
        callback = this.setNextCallback(callback);
        this.setState(nextState, callback);
      };
      _proto.setNextCallback = function setNextCallback(callback) {
        var _this4 = this;
        var active = true;
        this.nextCallback = function(event) {
          if (active) {
            active = false;
            _this4.nextCallback = null;
            callback(event);
          }
        };
        this.nextCallback.cancel = function() {
          active = false;
        };
        return this.nextCallback;
      };
      _proto.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
        this.setNextCallback(handler);
        var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
        if (!node || doesNotHaveTimeoutOrListener) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          this.props.addEndListener(node, this.nextCallback);
        }
        if (timeout != null) {
          setTimeout(this.nextCallback, timeout);
        }
      };
      _proto.render = function render() {
        var status = this.state.status;
        if (status === UNMOUNTED) {
          return null;
        }
        var _this$props = this.props, children = _this$props.children, childProps = _objectWithoutPropertiesLoose(_this$props, ["children"]);
        delete childProps.in;
        delete childProps.mountOnEnter;
        delete childProps.unmountOnExit;
        delete childProps.appear;
        delete childProps.enter;
        delete childProps.exit;
        delete childProps.timeout;
        delete childProps.addEndListener;
        delete childProps.onEnter;
        delete childProps.onEntering;
        delete childProps.onEntered;
        delete childProps.onExit;
        delete childProps.onExiting;
        delete childProps.onExited;
        if (typeof children === "function") {
          return children(status, childProps);
        }
        var child = _react.default.Children.only(children);
        return _react.default.cloneElement(child, childProps);
      };
      return Transition2;
    }(_react.default.Component);
    Transition.contextTypes = {
      transitionGroup: PropTypes.object
    };
    Transition.childContextTypes = {
      transitionGroup: function transitionGroup() {
      }
    };
    Transition.propTypes = true ? {
      /**
       * A `function` child can be used instead of a React element. This function is
       * called with the current transition status (`'entering'`, `'entered'`,
       * `'exiting'`, `'exited'`, `'unmounted'`), which can be used to apply context
       * specific props to a component.
       *
       * ```jsx
       * <Transition in={this.state.in} timeout={150}>
       *   {state => (
       *     <MyComponent className={`fade fade-${state}`} />
       *   )}
       * </Transition>
       * ```
       */
      children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,
      /**
       * Show the component; triggers the enter or exit states
       */
      in: PropTypes.bool,
      /**
       * By default the child component is mounted immediately along with
       * the parent `Transition` component. If you want to "lazy mount" the component on the
       * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
       * mounted, even on "exited", unless you also specify `unmountOnExit`.
       */
      mountOnEnter: PropTypes.bool,
      /**
       * By default the child component stays mounted after it reaches the `'exited'` state.
       * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
       */
      unmountOnExit: PropTypes.bool,
      /**
       * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
       * If you want to transition on the first mount set `appear` to `true`, and the
       * component will transition in as soon as the `<Transition>` mounts.
       *
       * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
       */
      appear: PropTypes.bool,
      /**
       * Enable or disable enter transitions.
       */
      enter: PropTypes.bool,
      /**
       * Enable or disable exit transitions.
       */
      exit: PropTypes.bool,
      /**
       * The duration of the transition, in milliseconds.
       * Required unless `addEndListener` is provided.
       *
       * You may specify a single timeout for all transitions:
       *
       * ```jsx
       * timeout={500}
       * ```
       *
       * or individually:
       *
       * ```jsx
       * timeout={{
       *  appear: 500,
       *  enter: 300,
       *  exit: 500,
       * }}
       * ```
       *
       * - `appear` defaults to the value of `enter`
       * - `enter` defaults to `0`
       * - `exit` defaults to `0`
       *
       * @type {number | { enter?: number, exit?: number, appear?: number }}
       */
      timeout: function timeout(props) {
        var pt = _PropTypes.timeoutsShape;
        if (!props.addEndListener)
          pt = pt.isRequired;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return pt.apply(void 0, [props].concat(args));
      },
      /**
       * Add a custom transition end trigger. Called with the transitioning
       * DOM node and a `done` callback. Allows for more fine grained transition end
       * logic. **Note:** Timeouts are still used as a fallback if provided.
       *
       * ```jsx
       * addEndListener={(node, done) => {
       *   // use the css transitionend event to mark the finish of a transition
       *   node.addEventListener('transitionend', done, false);
       * }}
       * ```
       */
      addEndListener: PropTypes.func,
      /**
       * Callback fired before the "entering" status is applied. An extra parameter
       * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
       *
       * @type Function(node: HtmlElement, isAppearing: bool) -> void
       */
      onEnter: PropTypes.func,
      /**
       * Callback fired after the "entering" status is applied. An extra parameter
       * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
       *
       * @type Function(node: HtmlElement, isAppearing: bool)
       */
      onEntering: PropTypes.func,
      /**
       * Callback fired after the "entered" status is applied. An extra parameter
       * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
       *
       * @type Function(node: HtmlElement, isAppearing: bool) -> void
       */
      onEntered: PropTypes.func,
      /**
       * Callback fired before the "exiting" status is applied.
       *
       * @type Function(node: HtmlElement) -> void
       */
      onExit: PropTypes.func,
      /**
       * Callback fired after the "exiting" status is applied.
       *
       * @type Function(node: HtmlElement) -> void
       */
      onExiting: PropTypes.func,
      /**
       * Callback fired after the "exited" status is applied.
       *
       * @type Function(node: HtmlElement) -> void
       */
      onExited: PropTypes.func
      // Name the function so it is clearer in the documentation
    } : {};
    function noop() {
    }
    Transition.defaultProps = {
      in: false,
      mountOnEnter: false,
      unmountOnExit: false,
      appear: false,
      enter: true,
      exit: true,
      onEnter: noop,
      onEntering: noop,
      onEntered: noop,
      onExit: noop,
      onExiting: noop,
      onExited: noop
    };
    Transition.UNMOUNTED = 0;
    Transition.EXITED = 1;
    Transition.ENTERING = 2;
    Transition.ENTERED = 3;
    Transition.EXITING = 4;
    var _default = (0, _reactLifecyclesCompat.polyfill)(Transition);
    exports.default = _default;
  }
});

// node_modules/react-toastify/lib/utils/cssTransition.js
var require_cssTransition = __commonJS({
  "node_modules/react-toastify/lib/utils/cssTransition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _slicedToArray = /* @__PURE__ */ function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    exports.default = function(_ref) {
      var enter = _ref.enter, exit = _ref.exit, _ref$duration = _ref.duration, duration = _ref$duration === void 0 ? 750 : _ref$duration, _ref$appendPosition = _ref.appendPosition, appendPosition = _ref$appendPosition === void 0 ? false : _ref$appendPosition;
      return function Animation(_ref2) {
        var children = _ref2.children, position = _ref2.position, preventExitTransition = _ref2.preventExitTransition, props = _objectWithoutProperties(_ref2, ["children", "position", "preventExitTransition"]);
        var enterClassName = appendPosition ? enter + "--" + position : enter;
        var exitClassName = appendPosition ? exit + "--" + position : exit;
        var enterDuration = void 0, exitDuration = void 0;
        if (Array.isArray(duration) && duration.length === 2) {
          var _duration = _slicedToArray(duration, 2);
          enterDuration = _duration[0];
          exitDuration = _duration[1];
        } else {
          enterDuration = exitDuration = duration;
        }
        var onEnter = function onEnter2(node) {
          node.classList.add(enterClassName);
          node.style.animationFillMode = "forwards";
          node.style.animationDuration = enterDuration * 1e-3 + "s";
        };
        var onEntered = function onEntered2(node) {
          node.classList.remove(enterClassName);
          node.style.cssText = "";
        };
        var onExit = function onExit2(node) {
          node.classList.add(exitClassName);
          node.style.animationFillMode = "forwards";
          node.style.animationDuration = exitDuration * 1e-3 + "s";
        };
        return _react2.default.createElement(
          _Transition2.default,
          _extends({}, props, {
            timeout: preventExitTransition ? 0 : {
              enter: enterDuration,
              exit: exitDuration
            },
            onEnter,
            onEntered,
            onExit: preventExitTransition ? noop : onExit
          }),
          children
        );
      };
    };
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _Transition = require_Transition();
    var _Transition2 = _interopRequireDefault(_Transition);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var noop = function noop2() {
    };
  }
});

// node_modules/react-toastify/lib/components/Transitions.js
var require_Transitions = __commonJS({
  "node_modules/react-toastify/lib/components/Transitions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Flip = exports.Zoom = exports.Slide = exports.Bounce = void 0;
    var _cssTransition = require_cssTransition();
    var _cssTransition2 = _interopRequireDefault(_cssTransition);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Bounce = (0, _cssTransition2.default)({
      enter: "Toastify__bounce-enter",
      exit: "Toastify__bounce-exit",
      appendPosition: true
    });
    var Slide = (0, _cssTransition2.default)({
      enter: "Toastify__slide-enter",
      exit: "Toastify__slide-exit",
      duration: [450, 750],
      appendPosition: true
    });
    var Zoom = (0, _cssTransition2.default)({
      enter: "Toastify__zoom-enter",
      exit: "Toastify__zoom-exit"
    });
    var Flip = (0, _cssTransition2.default)({
      enter: "Toastify__flip-enter",
      exit: "Toastify__flip-exit"
    });
    exports.Bounce = Bounce;
    exports.Slide = Slide;
    exports.Zoom = Zoom;
    exports.Flip = Flip;
  }
});

// node_modules/react-toastify/lib/utils/EventManager.js
var require_EventManager = __commonJS({
  "node_modules/react-toastify/lib/utils/EventManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    var eventManager = {
      eventList: /* @__PURE__ */ new Map(),
      on: function on(event, callback) {
        this.eventList.has(event) || this.eventList.set(event, []);
        this.eventList.get(event).push(callback);
        return this;
      },
      off: function off() {
        var event = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        return this.eventList.delete(event);
      },
      emit: function emit(event) {
        var _this = this;
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (!this.eventList.has(event)) {
          return false;
        }
        this.eventList.get(event).forEach(function(callback) {
          return setTimeout(function() {
            return callback.call.apply(callback, [_this].concat(_toConsumableArray(args)));
          }, 0);
        });
        return true;
      }
    };
    exports.default = eventManager;
  }
});

// node_modules/react-toastify/lib/components/ToastContainer.js
var require_ToastContainer = __commonJS({
  "node_modules/react-toastify/lib/components/ToastContainer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _classnames = require_classnames();
    var _classnames2 = _interopRequireDefault(_classnames);
    var _TransitionGroup = require_TransitionGroup();
    var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);
    var _Toast = require_Toast();
    var _Toast2 = _interopRequireDefault(_Toast);
    var _CloseButton = require_CloseButton();
    var _CloseButton2 = _interopRequireDefault(_CloseButton);
    var _Transitions = require_Transitions();
    var _constant = require_constant();
    var _EventManager = require_EventManager();
    var _EventManager2 = _interopRequireDefault(_EventManager);
    var _propValidator = require_propValidator();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ToastContainer = function(_Component) {
      _inherits(ToastContainer2, _Component);
      function ToastContainer2() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, ToastContainer2);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToastContainer2.__proto__ || Object.getPrototypeOf(ToastContainer2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          toast: [],
          isDocumentHidden: false
        }, _this.collection = {}, _this.isToastActive = function(id) {
          return _this.state.toast.indexOf(parseInt(id, 10)) !== -1;
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(ToastContainer2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;
          var SHOW = _constant.ACTION.SHOW, CLEAR = _constant.ACTION.CLEAR, MOUNTED = _constant.ACTION.MOUNTED;
          _EventManager2.default.on(SHOW, function(content, options) {
            return _this2.show(content, options);
          }).on(CLEAR, function(id) {
            return id !== null ? _this2.removeToast(id) : _this2.clear();
          }).emit(MOUNTED, this);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          _EventManager2.default.off(_constant.ACTION.SHOW);
          _EventManager2.default.off(_constant.ACTION.CLEAR);
        }
        //isDocumentHidden = () => this.setState({ isDocumentHidden: document.hidden });
      }, {
        key: "removeToast",
        value: function removeToast(id) {
          this.setState({
            toast: this.state.toast.filter(function(v) {
              return v !== parseInt(id, 10);
            })
          }, this.dispatchChange);
        }
      }, {
        key: "dispatchChange",
        value: function dispatchChange() {
          _EventManager2.default.emit(_constant.ACTION.ON_CHANGE, this.state.toast.length);
        }
      }, {
        key: "makeCloseButton",
        value: function makeCloseButton(toastClose, toastId, type) {
          var _this3 = this;
          var closeButton = this.props.closeButton;
          if ((0, _react.isValidElement)(toastClose) || toastClose === false) {
            closeButton = toastClose;
          }
          return closeButton === false ? false : (0, _react.cloneElement)(closeButton, {
            closeToast: function closeToast() {
              return _this3.removeToast(toastId);
            },
            type
          });
        }
      }, {
        key: "getAutoCloseDelay",
        value: function getAutoCloseDelay(toastAutoClose) {
          return toastAutoClose === false || (0, _propValidator.isValidDelay)(toastAutoClose) ? toastAutoClose : this.props.autoClose;
        }
      }, {
        key: "canBeRendered",
        value: function canBeRendered(content) {
          return (0, _react.isValidElement)(content) || typeof content === "string" || typeof content === "number" || typeof content === "function";
        }
      }, {
        key: "parseClassName",
        value: function parseClassName(prop) {
          if (typeof prop === "string") {
            return prop;
          } else if (prop !== null && (typeof prop === "undefined" ? "undefined" : _typeof(prop)) === "object" && "toString" in prop) {
            return prop.toString();
          }
          return null;
        }
      }, {
        key: "show",
        value: function show(content, options) {
          var _this4 = this;
          if (!this.canBeRendered(content)) {
            throw new Error("The element you provided cannot be rendered. You provided an element of type " + (typeof content === "undefined" ? "undefined" : _typeof(content)));
          }
          var toastId = options.toastId;
          var closeToast = function closeToast2() {
            return _this4.removeToast(toastId);
          };
          var toastOptions = {
            id: toastId,
            type: options.type,
            closeToast,
            updateId: options.updateId,
            rtl: this.props.rtl,
            position: options.position || this.props.position,
            transition: options.transition || this.props.transition,
            className: this.parseClassName(options.className || this.props.toastClassName),
            bodyClassName: this.parseClassName(options.bodyClassName || this.props.bodyClassName),
            closeButton: this.makeCloseButton(options.closeButton, toastId, options.type),
            pauseOnHover: options.pauseOnHover !== null ? options.pauseOnHover : this.props.pauseOnHover,
            draggable: options.draggable !== null ? options.draggable : this.props.draggable,
            draggablePercent: options.draggable !== null ? options.draggablePercent : this.props.draggablePercent,
            closeOnClick: options.closeOnClick !== null ? options.closeOnClick : this.props.closeOnClick,
            progressClassName: this.parseClassName(options.progressClassName || this.props.progressClassName),
            autoClose: this.getAutoCloseDelay(options.autoClose !== false ? parseInt(options.autoClose, 10) : options.autoClose),
            hideProgressBar: typeof options.hideProgressBar === "boolean" ? options.hideProgressBar : this.props.hideProgressBar
          };
          typeof options.onOpen === "function" && (toastOptions.onOpen = options.onOpen);
          typeof options.onClose === "function" && (toastOptions.onClose = options.onClose);
          if ((0, _react.isValidElement)(content) && typeof content.type !== "string" && typeof content.type !== "number") {
            content = (0, _react.cloneElement)(content, {
              closeToast
            });
          } else if (typeof content === "function") {
            content = content({ closeToast });
          }
          this.collection = _extends({}, this.collection, _defineProperty({}, toastId, {
            position: toastOptions.position,
            options: toastOptions,
            content
          }));
          this.setState({
            toast: toastOptions.updateId !== null ? [].concat(_toConsumableArray(this.state.toast)) : [].concat(_toConsumableArray(this.state.toast), [toastId])
          }, this.dispatchChange);
        }
      }, {
        key: "makeToast",
        value: function makeToast(content, options) {
          return _react2.default.createElement(
            _Toast2.default,
            _extends({}, options, {
              isDocumentHidden: this.state.isDocumentHidden,
              key: "toast-" + options.id
            }),
            content
          );
        }
      }, {
        key: "clear",
        value: function clear() {
          this.setState({ toast: [] });
        }
      }, {
        key: "renderToast",
        value: function renderToast() {
          var _this5 = this;
          var toastToRender = {};
          var _props = this.props, className = _props.className, style = _props.style, newestOnTop = _props.newestOnTop;
          var collection = newestOnTop ? Object.keys(this.collection).reverse() : Object.keys(this.collection);
          collection.forEach(function(toastId) {
            var toast = _this5.collection[toastId];
            toastToRender[toast.position] || (toastToRender[toast.position] = []);
            if (_this5.state.toast.indexOf(parseInt(toastId, 10)) !== -1) {
              toastToRender[toast.position].push(_this5.makeToast(toast.content, toast.options));
            } else {
              toastToRender[toast.position].push(null);
              delete _this5.collection[toastId];
            }
          });
          return Object.keys(toastToRender).map(function(position) {
            var disablePointer = toastToRender[position].length === 1 && toastToRender[position][0] === null;
            var props = {
              className: (0, _classnames2.default)("Toastify__toast-container", "Toastify__toast-container--" + position, { "Toastify__toast-container--rtl": _this5.props.rtl }, _this5.parseClassName(className)),
              style: disablePointer ? _extends({}, style, { pointerEvents: "none" }) : _extends({}, style)
            };
            return _react2.default.createElement(
              _TransitionGroup2.default,
              _extends({}, props, { key: "container-" + position }),
              toastToRender[position]
            );
          });
        }
      }, {
        key: "render",
        value: function render() {
          return _react2.default.createElement(
            "div",
            { className: "Toastify" },
            this.renderToast()
          );
        }
      }]);
      return ToastContainer2;
    }(_react.Component);
    ToastContainer.propTypes = {
      /**
       * Set toast position
       */
      position: _propTypes2.default.oneOf((0, _propValidator.objectValues)(_constant.POSITION)),
      /**
       * Disable or set autoClose delay
       */
      autoClose: _propValidator.falseOrDelay,
      /**
       * Disable or set a custom react element for the close button
       */
      closeButton: _propValidator.falseOrElement,
      /**
       * Hide or not progress bar when autoClose is enabled
       */
      hideProgressBar: _propTypes2.default.bool,
      /**
       * Pause toast duration on hover
       */
      pauseOnHover: _propTypes2.default.bool,
      /**
       * Dismiss toast on click
       */
      closeOnClick: _propTypes2.default.bool,
      /**
       * Newest on top
       */
      newestOnTop: _propTypes2.default.bool,
      /**
       * An optional className
       */
      className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      /**
       * An optional style
       */
      style: _propTypes2.default.object,
      /**
       * An optional className for the toast
       */
      toastClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      /**
       * An optional className for the toast body
       */
      bodyClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      /**
       * An optional className for the toast progress bar
       */
      progressClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      /**
       * Define enter and exit transition using react-transition-group
       */
      transition: _propTypes2.default.func,
      /**
       * Support rtl display
       */
      rtl: _propTypes2.default.bool,
      /**
       * Allow toast to be draggable
       */
      draggable: _propTypes2.default.bool,
      /**
       * The percentage of the toast's width it takes for a drag to dismiss a toast
       */
      draggablePercent: _propTypes2.default.number,
      /**
       * ⚠️ NOT WORKING ATM, has been disabled until I fix it ⚠️
       * pause on document visibility change
       */
      pauseOnVisibilityChange: _propTypes2.default.bool
    };
    ToastContainer.defaultProps = {
      position: _constant.POSITION.TOP_RIGHT,
      transition: _Transitions.Bounce,
      rtl: false,
      pauseOnVisibilityChange: true,
      autoClose: 5e3,
      hideProgressBar: false,
      closeButton: _react2.default.createElement(_CloseButton2.default, null),
      pauseOnHover: true,
      closeOnClick: true,
      newestOnTop: false,
      draggable: true,
      draggablePercent: 80,
      className: null,
      style: null,
      toastClassName: null,
      bodyClassName: null,
      progressClassName: null
    };
    exports.default = ToastContainer;
  }
});

// node_modules/react-toastify/lib/toaster.js
var require_toaster = __commonJS({
  "node_modules/react-toastify/lib/toaster.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _EventManager = require_EventManager();
    var _EventManager2 = _interopRequireDefault(_EventManager);
    var _constant = require_constant();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var defaultOptions = {
      type: _constant.TYPE.DEFAULT,
      autoClose: null,
      closeButton: null,
      hideProgressBar: null,
      position: null,
      pauseOnHover: null,
      closeOnClick: null,
      className: null,
      bodyClassName: null,
      progressClassName: null,
      transition: null,
      updateId: null,
      draggable: null
    };
    var container = null;
    var queue = [];
    var toastId = 0;
    function mergeOptions(options, type) {
      return _extends({}, defaultOptions, options, {
        type,
        toastId: ++toastId
      });
    }
    function emitEvent(content, options) {
      if (container !== null) {
        _EventManager2.default.emit(_constant.ACTION.SHOW, content, options);
      } else {
        queue.push({ action: _constant.ACTION.SHOW, content, options });
      }
      return options.toastId;
    }
    var toaster = _extends(function(content, options) {
      return emitEvent(content, mergeOptions(options, options && options.type || _constant.TYPE.DEFAULT));
    }, {
      success: function success(content, options) {
        return emitEvent(content, mergeOptions(options, _constant.TYPE.SUCCESS));
      },
      info: function info(content, options) {
        return emitEvent(content, mergeOptions(options, _constant.TYPE.INFO));
      },
      warn: function warn(content, options) {
        return emitEvent(content, mergeOptions(options, _constant.TYPE.WARNING));
      },
      warning: function warning(content, options) {
        return emitEvent(content, mergeOptions(options, _constant.TYPE.WARNING));
      },
      error: function error(content, options) {
        return emitEvent(content, mergeOptions(options, _constant.TYPE.ERROR));
      },
      dismiss: function dismiss() {
        var id = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        return container && _EventManager2.default.emit(_constant.ACTION.CLEAR, id);
      },
      isActive: function isActive() {
        return false;
      },
      update: function update(id, options) {
        setTimeout(function() {
          if (container && typeof container.collection[id] !== "undefined") {
            var _container$collection = container.collection[id], oldOptions = _container$collection.options, oldContent = _container$collection.content;
            var updateId = oldOptions.updateId !== null ? oldOptions.updateId + 1 : 1;
            var nextOptions = _extends({}, oldOptions, options, {
              toastId: id,
              updateId
            });
            var content = typeof nextOptions.render !== "undefined" ? nextOptions.render : oldContent;
            delete nextOptions.render;
            emitEvent(content, nextOptions);
          }
        }, 0);
      },
      onChange: function onChange(callback) {
        if (typeof callback === "function") {
          _EventManager2.default.on(_constant.ACTION.ON_CHANGE, callback);
        }
      }
    }, {
      POSITION: _constant.POSITION,
      TYPE: _constant.TYPE
    });
    _EventManager2.default.on(_constant.ACTION.MOUNTED, function(containerInstance) {
      container = containerInstance;
      toaster.isActive = function(id) {
        return container.isToastActive(id);
      };
      queue.forEach(function(item) {
        _EventManager2.default.emit(item.action, item.content, item.options);
      });
      queue = [];
    });
    exports.default = toaster;
  }
});

// node_modules/react-toastify/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-toastify/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Flip = exports.Zoom = exports.Slide = exports.Bounce = exports.cssTransition = exports.toast = exports.ToastContainer = void 0;
    var _ToastContainer = require_ToastContainer();
    var _ToastContainer2 = _interopRequireDefault(_ToastContainer);
    var _Transitions = require_Transitions();
    var _toaster = require_toaster();
    var _toaster2 = _interopRequireDefault(_toaster);
    var _cssTransition = require_cssTransition();
    var _cssTransition2 = _interopRequireDefault(_cssTransition);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.ToastContainer = _ToastContainer2.default;
    exports.toast = _toaster2.default;
    exports.cssTransition = _cssTransition2.default;
    exports.Bounce = _Transitions.Bounce;
    exports.Slide = _Transitions.Slide;
    exports.Zoom = _Transitions.Zoom;
    exports.Flip = _Transitions.Flip;
  }
});
export default require_lib();
//# sourceMappingURL=react-toastify.js.map
