# bpd cUI Light changelog
# [0.2.5] 2020-01-15
* [Changed] Update dependencies
# [0.2.4] 2020-01-14
* [Changed] Update dependencies
# [0.2.3] 2020-01-10
* [Changed] Update dependencies
# [0.2.2] 2020-12-18
* [Changed] Update dependencies
# [0.2.1] 2020-12-09
* [Change] Move some interfaces to main project
# [0.2.0] 2020-12-08
* [Added] Split core, plugins and components into separate projects. Change in in build features.
# [0.1.38] 2020-11-18
* [Added] Introduction to developing interface
* [Fixed] Small adjustments and fixed to links in scrollspy
* [Fixed] Small corrections in switch
# [0.1.37] 2020-11-15
* [Added] Cui instance is able to create new cui element instance on existing html element
* [Added] Offset update event returns more details: event source and whether is scrolling or not
* [Changed] Scrollspy has been rewritten - will replace intersection, new modes (single, multi), new options and events
* [Changed] Offset to emit ratioX and ratioY on scroll rather than limit
# [0.1.36] 2020-11-05
* [Changed] Optimized code in drop and tooltip - added timeout, added support for multiple actions
# [0.1.35] 2020-11-04
* [Added] Automatic drop and tooltip position calculator
# [0.1.34] 2020-11-03
* [Changed] Element type which is passed to component handler
# [0.1.33] 2020-11-03
* [Added] New component tooltip to replace CSS based tooltip
# [0.1.32] 2020-11-02
* [Added] css-variables-plugin supports bus events
* [Fixed] Sortable performance and new element detection
* [Fixed] Opacity animator
# [0.1.31] 2020-10-31
* [Added] Initial implementation of plugin that is able to change some of framework styles
* [Fixed] Perfromance improvements while moving in slide, float, banner and sortable 
# [0.1.30] 2020-10-29
* [Added] Component cover
* [Added] Component sortable
* [Added] Pause and Paused events in spinner/spinner icons come also with component
* [Fixed] Drop events emit
* [Fixed] Fixed open/close via cui-open and cui-close
# [0.1.29] 2020-10-26
* [Fixed] Initializer issues
# [0.1.28] 2020-10-26
* [Added] Offset new modes hanlder - static (default) keep existing behavior. New one - dynamic - was introduced.
* [Added] Icon scale option - minimum is 1 (default), accepts integers
* [Changed] Shorten offcanvas animation time
* [Fixed] Spinner not working
# [0.1.27] 2020-10-23
* [Added] On component deletion - detach all events subscribed to component
* [Added] Offset - Emit offset event every few pixels scrolled - add limitX and limitY properties which indicate whether scrolling reached end of the container
* [Changed] Action support in open, close, toggle components has been extended
* [Changed] Behavior of global move listener - events will be emitted only if there was move after down
* [Fixed] Properly remove event listeners from elements
# [0.1.26] 2020-10-22
* [Fixed] Performance improvements in move/swipe listeners
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