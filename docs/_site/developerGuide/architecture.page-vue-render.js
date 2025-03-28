
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('html',[_m(0),_v(" "),_c('body',[_c('div',{attrs:{"id":"app"}},[_c('header',[_c('navbar',{scopedSlots:_u([{key:"brand",fn:function(){return [_c('a',{staticClass:"navbar-brand",attrs:{"href":"/o2des-studio/index.html","title":"Home"}},[_v("O2DES Studio")])]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/o2des-studio/index.html"}},[_v("Home")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/o2des-studio/userGuide/index.html"}},[_v("User Guide")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/o2des-studio/developerGuide/index.html"}},[_v("Developer Guide")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/o2des-studio/about.html"}},[_v("About")])])])],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('overlay-source',{attrs:{"id":"site-nav","tag-name":"nav","to":"site-nav"}},[_c('div',{staticClass:"site-nav-top"},[_c('div',{staticClass:"fw-bold mb-2",staticStyle:{"font-size":"1.25rem"}},[_v("Navigation")])]),_v(" "),_c('div',{staticClass:"nav-component slim-scroll"},[_c('div',[_c('ul',[_c('li',[_c('a',{attrs:{"href":"/o2des-studio/index.html"}},[_v("Home")])]),_v(" "),_c('li',[_v("User Guide\n"),_c('ul',[_c('li',[_c('a',{attrs:{"href":"/o2des-studio/userGuide/gettingStarted.html"}},[_v("Getting Started")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/userGuide/basicFeatures.html"}},[_v("Basic Features")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/userGuide/advancedFeatures.html"}},[_v("Advanced Features")])])])]),_v(" "),_c('li',[_v("Developer Guide\n"),_c('ul',[_c('li',[_c('a',{attrs:{"href":"/o2des-studio/developerGuide/settingUp.html"}},[_v("Setting Up")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/developerGuide/architecture.html"}},[_v("Architecture")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/developerGuide/components.html"}},[_v("Components")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/developerGuide/stateManagement.html"}},[_v("State Management")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/developerGuide/nodeDevelopment.html"}},[_v("Node Development")])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/developerGuide/contributing.html"}},[_v("Contributing")])])])]),_v(" "),_c('li',[_c('a',{attrs:{"href":"/o2des-studio/about.html"}},[_v("About")])])])])])]),_v(" "),_c('div',{attrs:{"id":"page-content"}},[_c('div',{attrs:{"id":"content-wrapper"}},[_m(1),_v(" "),_c('div',{staticClass:"lead"},[_v("\nUnderstand the core architecture and design principles of O2DES Studio.\n")]),_v(" "),_m(2),_v(" "),_c('p',[_v("O2DES Studio is built with a modular architecture focusing on:")]),_v(" "),_m(3),_v(" "),_m(4),_v(" "),_m(5),_v(" "),_m(6),_m(7),_v(" "),_m(8),_v(" "),_m(9),_v(" "),_m(10),_v(" "),_m(11),_v(" "),_m(12),_v(" "),_m(13),_v(" "),_m(14),_m(15),_v(" "),_m(16),_v(" "),_c('box',{attrs:{"type":"info"}},[_v("\nThe node system is the heart of O2DES Studio, allowing users to create and connect simulation components visually.\n")]),_v(" "),_m(17),_c('p',[_v("Each node:")]),_v(" "),_m(18),_v(" "),_m(19),_v(" "),_c('p',[_v("We use Zustand for state management, split into logical slices:")]),_v(" "),_m(20),_v(" "),_c('p',[_v("Example store structure:")]),_v(" "),_m(21),_m(22),_v(" "),_c('tabs',[_c('tab',{scopedSlots:_u([{key:"header",fn:function(){return [_v("Rendering")]},proxy:true}])},[_v("\n    * Use React.memo for pure components\n    * Implement useCallback for event handlers\n    * Leverage useMemo for expensive computations\n  ")]),_v(" "),_c('tab',{scopedSlots:_u([{key:"header",fn:function(){return [_v("State")]},proxy:true}])},[_v("\n    * Use shallow selectors with Zustand\n    * Implement state normalization\n    * Batch updates when possible\n  ")])],1),_v(" "),_m(23),_v(" "),_c('panel',{attrs:{"type":"seamless","expanded":""},scopedSlots:_u([{key:"header",fn:function(){return [_c('p',[_c('strong',[_v("Component Structure")])])]},proxy:true}])},[_v(" "),_c('ol',[_c('li',[_c('strong',[_v("Base Components")]),_v(" ("),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("components/ui/")]),_v(")\n"),_c('ul',[_c('li',[_v("Follow atomic design principles")]),_v(" "),_c('li',[_v("Use TypeScript interfaces")]),_v(" "),_c('li',[_v("Support theming")])])]),_v(" "),_c('li',[_c('strong',[_v("Node Components")]),_v(" ("),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("components/nodes/")]),_v(")\n"),_c('ul',[_c('li',[_v("Extend BaseNode")]),_v(" "),_c('li',[_v("Implement required interfaces")]),_v(" "),_c('li',[_v("Support custom styling")]),_v(" "),_c('li',[_v("Handle user interactions")])])])])]),_v(" "),_m(24),_v(" "),_c('p',[_v("We implement a comprehensive error handling strategy:")]),_v(" "),_c('box',{attrs:{"type":"warning"}},[_c('ul',[_c('li',[_v("Use TypeScript for compile-time checks")]),_v(" "),_c('li',[_v("Implement runtime validations")]),_v(" "),_c('li',[_v("Use error boundaries for critical components")]),_v(" "),_c('li',[_v("Provide user-friendly error messages")])])]),_v(" "),_m(25),_v(" "),_m(26),_m(27),_v(" "),_m(28),_v(" "),_m(29),_v(" "),_c('i',{staticClass:"fa fa-arrow-circle-up fa-lg d-print-none",attrs:{"id":"scroll-top-button","onclick":"handleScrollTop()","aria-hidden":"true"}})],1),_v(" "),_c('overlay-source',{attrs:{"id":"page-nav","tag-name":"nav","to":"page-nav"}},[_c('div',{staticClass:"nav-component slim-scroll"},[_c('overlay-source',{staticClass:"nav nav-pills flex-column my-0 small no-flex-wrap",attrs:{"id":"mb-page-nav","tag-name":"nav","to":"mb-page-nav"}},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#architecture"}},[_v("Architecture‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#overview"}},[_v("Overview‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#core-components"}},[_v("Core Components‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#frontend-architecture"}},[_v("Frontend Architecture‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#state-management"}},[_v("State Management‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#data-flow"}},[_v("Data Flow‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#extension-points"}},[_v("Extension Points‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#project-structure"}},[_v("Project Structure‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#core-components-2"}},[_v("Core Components‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#node-system"}},[_v("Node System‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#state-management-2"}},[_v("State Management‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#performance-considerations"}},[_v("Performance Considerations‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#component-development-guidelines"}},[_v("Component Development Guidelines‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#error-handling"}},[_v("Error Handling‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#testing-strategy"}},[_v("Testing Strategy‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#contributing"}},[_v("Contributing‎")])])])],1)])],1)],1),_v(" "),_m(30)])])])])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('head',[_c('meta',{attrs:{"charset":"utf-8"}}),_v(" "),_c('meta',{attrs:{"name":"viewport","content":"width=device-width, initial-scale=1"}}),_v(" "),_c('title'),_v(" "),_c('link',{attrs:{"rel":"stylesheet","href":"/o2des-studio/stylesheets/main.css"}})])}
},function anonymous(
) {
with(this){return _c('h1',{attrs:{"id":"architecture"}},[_c('span',{staticClass:"anchor",attrs:{"id":"architecture"}}),_v("Architecture"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#architecture","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"overview"}},[_c('span',{staticClass:"anchor",attrs:{"id":"overview"}}),_v("Overview"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#overview","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Extensibility")]),_v(" "),_c('li',[_v("Maintainability")]),_v(" "),_c('li',[_v("Performance")]),_v(" "),_c('li',[_v("Type safety")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"core-components"}},[_c('span',{staticClass:"anchor",attrs:{"id":"core-components"}}),_v("Core Components"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#core-components","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"frontend-architecture"}},[_c('span',{staticClass:"anchor",attrs:{"id":"frontend-architecture"}}),_v("Frontend Architecture"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#frontend-architecture","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("graph TD\n")]),_c('span',[_v("    A[App] --> B[Flow Editor]\n")]),_c('span',[_v("    A --> C[Node Palette]\n")]),_c('span',[_v("    A --> D[Properties Panel]\n")]),_c('span',[_v("    B --> E[Node Components]\n")]),_c('span',[_v("    B --> F[Edge Components]\n")]),_c('span',[_v("    C --> G[Node Types]\n")]),_c('span',[_v("    D --> H[Node Properties]\n")]),_c('span',[_v("    D --> I[Edge Properties]\n")])])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"state-management"}},[_c('span',{staticClass:"anchor",attrs:{"id":"state-management"}}),_v("State Management"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#state-management","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Global state using Zustand")]),_v(" "),_c('li',[_v("Local component state")]),_v(" "),_c('li',[_v("Flow state management")]),_v(" "),_c('li',[_v("Undo/Redo system")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"data-flow"}},[_c('span',{staticClass:"anchor",attrs:{"id":"data-flow"}}),_v("Data Flow"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#data-flow","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ol',[_c('li',[_v("User interactions")]),_v(" "),_c('li',[_v("State updates")]),_v(" "),_c('li',[_v("Flow rendering")]),_v(" "),_c('li',[_v("Property updates")]),_v(" "),_c('li',[_v("Persistence")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"extension-points"}},[_c('span',{staticClass:"anchor",attrs:{"id":"extension-points"}}),_v("Extension Points"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#extension-points","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Custom node types")]),_v(" "),_c('li',[_v("Custom edge types")]),_v(" "),_c('li',[_v("Custom properties")]),_v(" "),_c('li',[_v("Custom behaviors")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"project-structure"}},[_c('span',{staticClass:"anchor",attrs:{"id":"project-structure"}}),_v("Project Structure"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#project-structure","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("src/\n")]),_c('span',[_v("├── app/              # Next.js App Router pages and layouts\n")]),_c('span',[_v("├── components/       # Reusable UI components\n")]),_c('span',[_v("│   ├── ui/          # Base UI components\n")]),_c('span',[_v("│   └── nodes/       # Custom node components\n")]),_c('span',[_v("├── lib/             # Utilities, constants, and helpers\n")]),_c('span',[_v("├── stores/          # Global state management (Zustand)\n")]),_c('span',[_v("└── types/           # TypeScript type definitions\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"core-components-2"}},[_c('span',{staticClass:"anchor",attrs:{"id":"core-components-2"}}),_v("Core Components"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#core-components-2","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"node-system"}},[_c('span',{staticClass:"anchor",attrs:{"id":"node-system"}}),_v("Node System"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#node-system","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("interface")]),_v(" NodeData {\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("id")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(";\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("type")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(";\n")]),_c('span',[_v("    position: { "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("x")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v("; y: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(" };\n")]),_c('span',[_v("    data: Record<"),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(", "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("any")]),_v(">;\n")]),_c('span',[_v("}\n")])])])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Extends "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("BaseNode")])]),_v(" "),_c('li',[_v("Implements required interfaces")]),_v(" "),_c('li',[_v("Provides custom styling and behavior")]),_v(" "),_c('li',[_v("Supports drag-and-drop interactions")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"state-management-2"}},[_c('span',{staticClass:"anchor",attrs:{"id":"state-management-2"}}),_v("State Management"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#state-management-2","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("useFlowStore")]),_v(": Manages the flow diagram state")]),_v(" "),_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("useProjectStore")]),_v(": Handles project-level state")]),_v(" "),_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("useUIStore")]),_v(": Controls UI-specific state")])])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("interface")]),_v(" FlowState {\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("nodes")]),_v(": Node[];\n")]),_c('span',[_v("    edges: Edge[];\n")]),_c('span',[_v("    selectedNodes: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v("[];\n")]),_c('span',[_v("    addNode: "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("node: Node")]),_v(") =>")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("void")]),_v(";\n")]),_c('span',[_v("    removeNode: "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("nodeId: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")])]),_v(") =>")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("void")]),_v(";\n")]),_c('span',[_v("}\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"performance-considerations"}},[_c('span',{staticClass:"anchor",attrs:{"id":"performance-considerations"}}),_v("Performance Considerations"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#performance-considerations","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"component-development-guidelines"}},[_c('span',{staticClass:"anchor",attrs:{"id":"component-development-guidelines"}}),_v("Component Development Guidelines"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#component-development-guidelines","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"error-handling"}},[_c('span',{staticClass:"anchor",attrs:{"id":"error-handling"}}),_v("Error Handling"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#error-handling","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"testing-strategy"}},[_c('span',{staticClass:"anchor",attrs:{"id":"testing-strategy"}}),_v("Testing Strategy"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#testing-strategy","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Example test structure")]),_v("\n")]),_c('span',[_v("describe("),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"NodeComponent\"")]),_v(", "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("() =>")]),_v(" {\n")]),_c('span',[_v("    it("),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"renders correctly\"")]),_v(", "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("() =>")]),_v(" {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Test rendering")]),_v("\n")]),_c('span',[_v("    });\n")]),_c('span',[_v("\n")]),_c('span',[_v("    it("),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"handles interactions\"")]),_v(", "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("() =>")]),_v(" {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Test user interactions")]),_v("\n")]),_c('span',[_v("    });\n")]),_c('span',[_v("});\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"contributing"}},[_c('span',{staticClass:"anchor",attrs:{"id":"contributing"}}),_v("Contributing"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#contributing","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("See our "),_c('a',{attrs:{"href":"/o2des-studio/developerGuide/contributing.html"}},[_v("Contributing Guide")]),_v(" for detailed information on:")])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Setting up the development environment")]),_v(" "),_c('li',[_v("Code style guidelines")]),_v(" "),_c('li',[_v("Pull request process")]),_v(" "),_c('li',[_v("Testing requirements")])])}
},function anonymous(
) {
with(this){return _c('footer',[_c('div',{staticClass:"text-center"},[_c('small',[_v("[ Generated by MarkBind ]")])])])}
}];
  