# bpd cUI Light changelog
# [0.1.26] WIP
# [0.1.25] 2020-10-22
* [Added] New event bus implementation that works along with old
* [Changed] Component open redux - for cUI emits open event, if target not set looks for first cUI in parent
* [Changed] Component close redux - for cUI emits close event
* [Fixed] Open/close issues on interactive components
# [0.1.24] 2020-10-20
* [Added] Logger print log level to console
* [Added] Animation engine to push error to callback if set
* [Changed] Move listener is not a globally attached rather than using separate listener per component 
* [Changed] Components Dialog, Offcanvas, Banner and Float now have common core
* [Fixed] Component toggle not toggeling class
* [Fixed] Event bus - call handler only when there are callbacks to call
# [0.1.23] 2020-10-19
* [Added] Option loop to slider - by default sliding will not occur in loop
* [Added] Option open to banner - banner may dis opened again after closing
# [0.1.22] 2020-10-18
* [Added] Slider and swiping engine
* [Added] Support for open/close events in drop
* [Added] Banner component
* [Fixed] Accordion not properly initialized when attribute is empty
* [Fixed] Possible fix for switch not properly resizing on content change 
# [0.1.21] 2020-10-11
* [Fixed] - Performance improvements
* [Fixed] - Security - toast set textContent instead of innerHTML
# [0.1.20] 2020-10-11
* [Changed] Don't pass context to event bus **on** method
# [0.1.19] 2020-10-11
* [Changed] Event bus detach will be done by event id not event context
* [Fixed] Intersection imports cleanup and fix in dealing with offset values
# [0.1.18] 2020-09-27
* [Fixed] Issues with alert onClose callback
# [0.1.17] 2020-09-26
* [Added] Automatic addition of class to component based on attribute value
* [Added] Option to reverse dialog in alert
# [0.1.16] 2020-09-15
* [Fixed] Remove cache from Element and Collection managers as they don't work properly with reactive frameworks
# [0.1.15] 2020-09-13
* [Added] Alert will update title and content everytime on show.
# [0.1.14] 2020-09-13
* [Added] New component: Float
# [0.1.13] 2020-09-10
* [Added] Shorthand for simple dialogs: "Info", "OkCancel", "YesNoCancel" - you can easily create simple alert dialogs in one line of code.
* [Fixed] Height calculation on components using height auto
# [0.1.12] 2020-08-12
* [Fixed] Mutation handler does not update component
* [Added] Option 'height' to switch component

# [0.1.11] 2020-08-10
* [Fixed] Adjusted all component to use new API and events system

# [0.1.10] 2020-08-09
* [Fixed] Multiple adjustments across components
* [Changed] Comppnents now react on event calls
* [Added] New API option - Handler whith mutation observer attached to capture child changes within component
* [Added] Emit to instance and element manager
* [Added] Cuid will be automatically added to cUI elements

# [0.1.9] 2020-08-08
* [Fixed] Export CuiInstance class
* [Change] Add mutation observer to accordion to detect children changes

# [0.1.8] 2020-08-06
* [Fixed] Offcanvas background

# [0.1.7] 2020-08-06
* [Fixed] Dialog and offcanvas background when opened
# [0.1.6] 2020-08-06
* [Fixed] Offset element now supports root element
* [Fixed] Blinking dialog and offcanvas when closed via keys or outside click
* [Fixed] Scrollspy now sets action on init
* [Changed] Added possibility to set additional state on openable/closable component

# [0.1.5] 2020-08-05
* [Fixed] More adjustments to mutation observer
* [Chnaged] Mutation observer now gets attribute value and passed ready to use argument object to handle and refresh
* [Changed] Open and close components will first try to call corresponding open/close function in specifi cUI component
* [Added] New components: dialog and offcanvas, accordion
* [Added] New component: dialog - initial implementation
* [Added] New plugin - Window click - captures click on window and emits event - handy for openable components to capture whether click was in or outside of target
* [Added] New component: offset - similiar
* [Added] New components: switch and switcher

# [0.1.3] 2020-07-13
* [Fixed] Unit test references
* [Fixed] Mutation observer not updating properly
* [Added] Initial function to copy setup values from JS module to CSS global variables

# [0.1.2] 2020-07-12
* [Changed] Refactoring

# [0.0.17] 2020-07-08
* [Changed] Event bus improvements
* [Added] New components: scrollspy and scroll, intersection
* [Added] Auto print plugin
* [Added] Event emits on components mutation/change
* [Added] Key press listener/observer

# [0.0.14] 2020-06-23
* [Added] Typescript typings

# [0.0.12] 2020-06-23
* [Added] Events emitions
* [Removed] CSS components have been moved to **cui-styles**

## [0.0.11] 2020-06-18
* [Fixed] Icons and banners layout
* [Added] Input accent colors

## [0.0.10] 2020-06-18
* [Added] Plugins managing system

## [0.0.9] 2020-06-17
* [Added] Support for custom components

## [0.0.8] 2020-06-15
* [Added] Methods for async/interactive callbacks in element manager
* [Added] Support for class **print** which reduces colors to black and white

## [0.0.7] 2020-06-14
* [Fixed] Various fixes related to unit tests
* [Fixed] Fast dom not updating nodes when mutate and fetch are nested

## [0.0.6] 2020-06-13
* [Changed] Automatic light mode moved to new plugins
* [Added] Support for framework plugins
* [Added] Framework internal event bus
* [Added] Input mixed component

## [0.0.5] 2020-06-12
* [Changed] Element cache behavior
* [Changed] Badge position and size
* [Added] Switch Css component
* [Added] Automatic light/dark mode - optional

## [0.0.4] 2020-06-11
* [Removed] Grid system from grid display mode
* [Fixed] Dropdown display
* [Fixed] Svg not showing in dark mode
* [Changed] Bahavior of mutation handler
* [Added] Interaction handler to mutated elements
* [Added] Collection handler to handle elements collections like lists, tabs switchers
* [Added] Circle progress

## [0.0.3] 2020-06-10
* [Fixed] Force element to be a flex when *-flex
* [Changed] Behavior of width / visiblity / container elements
* [Added] Support for drop / dropdown
* [Added] CSS option to hide element when device is touch / non-touch
* [Added] Section large
* [Added] Cover element

## [0.0.2] 2020-06-09
* [Fixed] Nabvar **li** items will be vertically centered
* [Changed] Icon button will have default or inverse background color instead of transparency
* [Changed] Tooltip will be smaller in width
* [Changed] Input label is now a block element
* [Added] Tooltip position classes
* [Added] Added **small** and **large** options to margins and paddings