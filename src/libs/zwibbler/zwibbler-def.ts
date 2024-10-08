export declare let Zwibbler: ZwibblerClass;

export interface ZwibblerClass {
    /** Contains references to all of the ZwibblerContexts in use. */
    "instances": ZwibblerContext[];

    // Use this as a parameter to Zwibbler.create to make an instance
    // that is not part of the DOM.
    "NODEJS_INSTANCE": string;

    /** Send an ajax request */
    ajax(settings: AjaxSettings): PromiseLike<XMLHttpRequest>;

    /* Defines a custom background drawing function */
    addCustomBackground(name: string, fn: BackgroundFn): void;

    /** Defines a custom node type */
    addCustomNode(type: string, ctor: CustomNodeClass): void;

    /** Adds a TTF or OTF font for use in PDF files.
     * @param url The url of the font
     * @return aApromise resolving to the name of the font.
     */
    addFont(url: string): PromiseLike<string>;

    /** Attaches a scope to an HTML element, executing all directives.
     * @param id A CSS selector or reference to the element.
     * @param scope The scope to attach.
     */
    attach(id: string | Element, scope: any): MainScope;

    /** Given an SVG Path (as would be used in the d attribute of a path element),
     * returns an array of commands suitable for use in a Zwibbler PathNode.
     */
    commandsFromSVGPath(d: string): number[];

    /** Defines a component for use in the Zwibbler framework, or
     * to be used with in createHTMLNode.
     * 
     * @param name The name of the component
     * @param component Defines the component
     */
    component<ScopeClass extends Scope = Scope>(name: string, component: ComponentWithProperties<ScopeClass>): void;

    /** Defines a controller function to be used with 
     *  &lt;zwibbler z-controller=...
     * 
     * @param name The name of the controller that will be specified in z-controller
     * @param fn The controller function to be called.
     */
    controller<ScopeClass extends MainScope = MainScope>(name: string, fn: (scope: ScopeClass) => void): void;

    /** Creates a zwibbler instance, filling the given element with the drawing area.
     * @param id The CSS selector or reference to the element that will contain the drawing area.
     * @param options Optional configuration settings. See Zwibbler configuration settings.
     */
    create(id: string | Element, options?: Properties): ZwibblerContext;

    /** Creates a component previously defined with Zwibbler.component().
     * @param parentScope The parent scope. Any properties defined in the component will be made available to the component.
     * @param name The name of the component, previously registered with Zwibbler.component
     * @param attributes A mapping from property name to expressions. The expression, evaluated on the current scope, will be assigned to the property on the child scope.
     * 
     * @return both the HTML element and the child scope.
     */
    createComponent(parentScope: any, name: string, attributes?: { [name: string]: string; }, childScope?: any): { "node": HTMLElement | SVGElement, "scope": Scope; };

    /** Destroys a component created with createComponent, removing any event listeners.*/
    destroyComponent(el: HTMLElement | SVGElement): void;

    /** Detach an element previously attached with attach, destroying components and detaching event listeners. */
    detach(el: HTMLElement): void;

    /** Recheck all javascript expressions in the Zwibbler framework, and trigger any callbacks, and udpate HTML accordingly */
    digest(): PromiseLike<void>;

    directive(name: string, fn: (d: DirectiveContext) => void): void;

    enableConsoleLogging(): void;

    formatText(ctx: ICanvasContext, o: TextOptions): FormattedText;

    /** Returns the Zwibbler Context, if any, from an element or a descendent. */
    getContext(element: HTMLElement): ZwibblerContext | null;

    getCustomBackground(name: string): BackgroundFn | null;

    /** Returns an object that helps manipulate the HTML */
    html(el: Element): HTMLHelpers;

    /** Inject some CSS into the web page. The CSS is injected once time, even if called multiple times
     * for the same cssText. It can be removed by calling Zwibbler.destroyAll()
     */
    injectStyle(cssText: string): void;

    /** Returns true if any element in the web page is in full screen mode.*/
    isFullscreen(): boolean;

    /** 
     <ul>
     <li> Destroys an open instances of Zwibbler.
     <li> Removes any styles that have been injected into the web page.
     <li> Forgets any custom nodes or buttons.
     <li> Forgets fonts added by addFont()
     </ul>
     */
    destroyAll(): void;

    /** Draws the given SVG Path commands to the HTML canvas. */
    drawSVGPath(ctx: ICanvasContext, d: string): void;

    /** Converts an rgba object to a string colour.
     * The returned colour is either of the form #000000 or rgba(0,0,0,0.0)
     * if it has transparency.
    */
    makeColour(clr: EColour): string;

    /**
     Prompt the user to open a file from their computer.
    */
    openFile(options: OpenFileArgsReturnsString): PromiseLike<{
        data: string;
        contentType: string;
    }>;

    openFile(options: OpenFileArgsReturnsArrayBuffer): PromiseLike<{
        data: ArrayBuffer;
        contentType: string;
    }>;

    openFile(options: OpenFileArgsReturnsFile): PromiseLike<{
        data: File;
        contentType: string;
    }>;

    /* Converts a colour string to r, g, b, and a values.
       The values are between 0 and 1.0. */
    parseColour(str: string, mustBeValid: boolean): EColour | null;
    parseColour(str: string): EColour;

    /** Creates a popup manually */
    Popup(selector: string | HTMLElement, args: ShowPopupArgs): Popup;

    /**
      Alters a colour to have an opacity value. The colour may be in # or rgb, rgba format.

      @param clr The colour, in one of these formats: #ffffff, #fff, rgba(255, 255, 255, 1.0), rgb(255, 255, 255)
      @param opacity Between 0 (fully transparent) and 1 (fully opaque)

      @returns colour in rgba or #ffffff format.
     */
    setColourOpacity(clr: string, opacity: number): string;

    /** Sets the a hash value in the window's url to the given
     * string, encoding it first.
     */
    setHashValue(name: string, value: string): void;

    /** Loads an image as a promise */
    loadImage(url: string): Promise<HTMLImageElement>;

    /** Retrieves the image size. */
    getImageSize(url: string): Promise<ISize>;
    getImageSize(url: string, fn: (width: number, height: number, img: HTMLImageElement) => void): void;

    /** Convert the document from Zwibbler format to the specified format.
     * The output is returned as a raw string, with each character representing one byte.
     * See ZwibblerContext.save() for the available formats.
     */
    save(docData: string, format: string, options: SaveOptionsReturnsString): Promise<string>;
    save(docData: string, options: SaveOptionsReturnsString): Promise<string>;
    save(docData: string, options: SaveOptionsReturnsBlob): Promise<Blob>;
    save(docData: string, format: string, options: SaveOptionsReturnsBlob): Promise<Blob>;

    /** Download the blob to the user's computer. */
    downloadBlob(data: Blob, filename: string): void;

    /** Opens the document and obtains the number of pages */
    getPageCount(docData: string): number;

    /** Decodes and returns the url hash value as a dictionary of keys */
    getUrlHash(): { [key: string]: string; };

    /** Decodes and returns the url query value as a dictionary of keys */
    getUrlQuery(): { [key: string]: string; };

    /** Returns a ZPointerListener for the given HTML element. This listener
     * abstracts all touch / pointer / mouse events into "up", "down", "move", or "tap"
     * You MUST destroy it when done.
     */
    NewPointerListener(element: Element, options: { useCapture?: boolean, useDocument?: boolean }): ZPointerListener;

    /** Returns a PDF context that will allow you to create PDF files with the ICanvasContext interface. 
     * At the end, you can all download(filename) to download it to the user's computer.
    */
    newPdfContext(width: number, height: number): PdfContext;

    /** Open an SVG file and return an object that can get its size and draw it. */
    NewSvgImage(url: string): ZSvgImage;

    /** Lets you add sections to the built-in property panel. */
    propertyPanel(component: PanelComponent): void;

    getBuildDate(): Date;
}

export interface AjaxSettings {
    url: string;
    method?: "GET" | "POST";
    params?: any;
    mimeType?: string;
    contentType?: string;
    withCredentials?: boolean;
    data?: string;
    delay?: number;
    cancel?: Promise<void>;
    headers?: any;
}

export interface SessionKey {
    name: string;
    value: string;
    persistent: boolean;
};

export type ZPointerEvents =
    "down" |
    "up" |
    "move" |
    "tap" |
    "drag" |
    "wheel" |
    "doubletap" |
    "hold" |
    "gesturestart" |
    "gesturechange" |
    "gestureend" |
    "swipe";

export interface ZPointerEvent {
    type: ZPointerEvents;
    originalEvent: Event;
    target: EventTarget | null;
    pageX: number;
    pageY: number;
    pointerId: number;
    buttons: number;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    isTouch(): boolean;
    stopPropagation(): void;
    preventDefault(): void;
    setCapture(): void;

    /* For swipe / drag, returns the difference between
       start and end coordinates */
    getVector(): { x: number, y: number; };
}

export interface ZPointerListener {
    on(name: ZPointerEvents, fn: (event: ZPointerEvent) => void): void;
    removeListener(name: string, fn: (event: ZPointerEvent) => void): void;

    // You must call destroy when no longer needed, because the pointer listener
    // might attach to the document body and never go away.
    destroy(): void;
}

export interface ZSvgImage {
    src: string;
    complete: boolean;
    onload(): void;
    getRect(): ExternalRect;
    draw(ctx: ICanvasContext): void;
}

export interface SaveOptions {
    /** The page to save. Default: current page. */
    page?: number;

    /** The pages to save, if page is not specified and the format supports multiple pages.
     * Default: all
     */
    pages?: number[];

    /** Maximum width of the output image.*/
    maxWidth?: number;

    /** The data format to save. Default is "zwibbler3" which is the only format that can be
     * opened again. All others are export-only.
     * Formats are listed in the docs and include zwibbler3, png, jpg, svg, pdf
     */
    format?: string;

    /** A rectangle in document coordinates. If specified, only this portion of the document
     * is saved.
     */
    rect?: ExternalRect;

    /** Encoding. Default depends on the format. It is "string" for zwibbler3 and svg,
    and data-uri for all others.
    */
    encoding?: "string" | "data-uri" | "blob";
}

export interface SaveOptionsReturnsString extends SaveOptions {
    encoding?: "string" | "data-uri";
}

export interface SaveOptionsReturnsBlob extends SaveOptions {
    encoding: "blob";
}

export interface HTMLHelpers {
    getOffset(): { left: number, top: number, width: number, height: number; };
    setOffset(offset: { left: number, top: number; }): HTMLHelpers;
}

export interface HasKeys {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

export interface ZwibblerContext<Globals = IAny> {
    /** A place for you to store application specific data. */
    globals: Globals;

    /** The current property summary, as returned by getPropertySummary(). */
    summary: PropertySummary;

    addKeyboardShortcut(key: string, fn: (e: Event) => void): void;
    addRemoteChanges(changes: string, reset?: boolean): void;
    attach(scope: any, el: HTMLElement): void;

    /** Automatically scroll the document, if necessary, to ensure the given 
        document point is in the view. This is meant to be called by a tool
        repeatedly during a dragging operation.
    */
    autoScroll(docX: number, docY: number): void;

    abortTransaction(): void;
    addSelectionHandle(x: number, y: number, xoffset: number, yoffset: number, imageUrl: string, action: ((pageX: number, pageY: number) => void) | string, showFn?: (summary: PropertySummary) => boolean): void;
    addToGroup(parentid: NodeID, ids: NodeIDs): void;
    addToLanguage(data: string): void;
    addPage(width?: number, height?: number): number;
    addPanel(order: number, position: string, div: HTMLElement): void;
    alignNodes(how: AlignRule, ids?: NodeIDs): void;
    begin(): void;
    beginTransaction(): void;

    /** remove keyboard focus */
    blur(): void;

    bringToFront(ids?: NodeIDs): void;
    sendBroadcast(data: string): void;
    setSessionKey(name: string, value: any, persistent: boolean): void;
    canRedo(): boolean;
    canUndo(): boolean;
    canMoveUp(): boolean;
    canMoveDown(): boolean;
    clearInterval(id: number): void;
    clearSelection(): void;
    clearTemporaryProperties(id: NodeID | NodeID[]): void;
    clearTimeout(id: number): void;
    clearUndo(): void;

    /** @deprecated Use setColour */
    clickColour(colour: string, button2: boolean): boolean | undefined;

    /**
     * Commit multiple operations that were started with beginTransaction().
     * @param skipUndo If true, the user will not be able to undo the operations.
     */
    commit(skipUndo?: boolean): void;

    /** @deprecated Use commit(true) */
    commitIrreversibleTransaction(): void;

    /** @deprecated Use commit(false) */
    commitTransaction(): void;

    /** Hack method */
    computeHTMLRects(): void;

    copy(noStore?: boolean, nodes?: NodeIDs): string;
    createDataNode(properties: any, parent?: NodeID): NodeID;
    createGroup(ids?: NodeID[]): NodeID | boolean;
    createLogger(prefix: string): (key: string, ...args: any[]) => void;
    createNode(type: string, properties: any, parent?: NodeID, index?: number): NodeID;
    createHTMLNode(type: string, properties?: any, parent?: NodeID, index?: number): NodeID;

    /** This method is meant to be called when the user starts dragging a toolbar item. You can then call
     * this to create an HTMLNode that can be dragged onto the canvas from the given pointer position.
     */
    createHTMLNodeFromDrag(type: string, properties: Properties, startX: number, startY: number): void;
    createPath(commands: number[]): string;
    createToolbar(divIn: string | HTMLElement, items: ToolbarItem[]): void;
    createShape(points_arr: number[]): void;
    cut(nodes?: NodeIDs): string;

    /** Define a decoration that is drawn on top of nodes. */
    decoration(decoration: Decoration): void;

    deleteNode(id?: NodeID | NodeID[]): void;
    deleteNodes(id?: NodeID[] | NodeID): void;
    deletePage(index?: number): void;
    deleteSelection(): void;
    destroy(): void;
    digest(fn?: () => void): void;
    dirty(): boolean;
    dispatchEvent(evt: Event): boolean;
    /** Simulate a pointer event of the given type. 
      @param type Must be one of up, down, or move
      @param argsIn Must include, at minimum, pageX, pageY, buttons or button.
     */
    mouseEvent(type: string, argsIn: any): boolean;

    /** Simulate a keyboard event
     * @param type "keydown" or "keyup"
     * @param argsIn members of the KeyboardEvent.
     */
    keyboardEvent(type: string, argsIn: any): boolean;
    download(format: string, filename: string, rect?: ExternalRect, maxWidth?: number): void;
    download(filename: string, options: SaveOptions): void;
    draw(ctx: ICanvasContext, options?: DrawOptions): void;
    editNodeText(id: NodeID): void;
    duplicate(): NodeID[];
    emit(name: string, ...args: any[]): any;
    emitNow(name: string, ...args: any[]): any;
    emitOnce(name: string, ...args: any[]): any;
    skipEvent(name: string): void;
    focus(showKeyboardCursor?: boolean, returnFocus?: HTMLElement | null): void;
    forEachNode(fn: (id: NodeID) => void): void;
    findNode(tag: string): NodeID | null;
    findNodes(tag: string): NodeID[];
    flip(degrees: number, centreX?: number, centreY?: number): void;
    flipNodes(nodes: NodeID[], degrees: number, centreX?: number, centreY?: number): void;
    generatePalette(divIn: string | HTMLElement, size: number, options?: PaletteOptions): void;
    getActiveLayer(): string;
    getAllNodes(): NodeID[];
    getBackgroundImage(): string | null;
    getBoundingRectangle(ids: NodeID[]): ExternalRect;

    /** 
     * Return the index of the node in its parent, or -1 if it has no parent.
     * @deprecated please use getDrawOrder */
    getNodeIndex(id: NodeID): number;

    /** 
     * Return the index of the node in its parent, or -1 if it has no parent.*/
    getDrawOrder(id: NodeID): number;

    getConfig(name: string): any;

    /** Returns the current page index, starting from 0 */
    getCurrentPage(): number;

    /** @deprecated Use getFillColour() */
    getCurrentFillColour(): any;

    /** @deprecated Use getStrokeColour() */
    getCurrentOutlineColour(): any;
    getCurrentTool(): string | null;

    /** Returns your custom object that was created from the class given to 
     * Zwibbler.addCustomNode() for this node. 
     * As a convenience, returns null if id is null.*/
    getCustomNode(id: NodeID | null): any;

    /** Given a point or rectangle on the web page, return the same coordinates in the document. */
    getDocumentCoordinates(x: number, y: number, width?: number, height?: number): ExternalRect;

    getDocumentProperties(): Properties;
    getDocumentProperty(name: string): any;
    getDocumentSize(page?: number): ExternalRect;
    getElement(): HTMLElement;

    /** Returns the current fill colour for future actions. */
    getFillColour(): string;
    getHistory(): {
        /** Change identifier */
        cid: string;
        /** Timestamp, as returned by Date.getTime() in milliseconds */
        ts: number;
    }[];
    getImageUrl(src: string): string;
    getLanguageString(key: string): string;
    getLocalChanges(): string;
    getLocalSessionKeys(): SessionKey[];
    getDrawingRectangle(): ExternalRect;
    getGroupParent(id: NodeID): NodeID | null;
    getGroupMembers(id: NodeID): NodeID[];
    getItemProperty(id: NodeID, property: string): any;
    getLayers(): string[];
    getLayerNodes(layerName: string): NodeID[];

    /**
     Returns the list of keys set by setSessionKey() since the last call to getNewSessionKeys()
     */
    getNewLocalSessionKeys(): SessionKey[];
    getNodeCoordinates(id: NodeID, x: number, y: number): ExternalPoint | null;
    getNodePageNumber(node: NodeID): number | null;
    getNodeProperty(id: NodeID, property: string): any;
    getNodeRectangle(idsIn: NodeID | NodeID[]): ExternalRect;
    getNodeScale(id: NodeID): ExternalPoint | null;
    getNodeTransform(id: NodeID): number[] | undefined;
    getNodeType(id: NodeID): string;
    getNodeUnderPoint(x: number, y: number, radius?: number): NodeID | null;
    getNodesUnderPoint(x: number, y: number, radius?: number): NodeID[];
    getPageCount(): number;

    /** Returns the NodeID corresponding to the page. This can be used
     * in copy() or cut() to copy/paste a whole page or store it for later use.
     */
    getPageNode(pageNumber: number): NodeID | null;
    getPageNode(): NodeID;
    getPageRect(page?: number): ExternalRect;
    getPathData(id: NodeID): number[] | null;
    getPathAsPoints(id: NodeID): ExternalPoint[][] | null;
    getCanvasScale(): number;
    getCanvasTranslate(): ITranslate;
    getCanvasSize(): ISize;
    getEditNode(): NodeID | null;

    // Returns information about the revision, or null if it does not exist.
    // The revision is from the getHistory() method.
    // The method is not fully implemented and returns only information
    // about the node identifiers added. More can be added by contacting
    // the developer.
    getRevisionInfo(cid: string): RevisionInfo | null;

    /** Given a point in the document, return it relative to the web page. */
    getScreenCoordinates(x: number, y: number): ExternalPoint;

    /** Given a rectangle in the document, return it relative to the web page. */
    getScreenCoordinates(x: number, y: number, width: number, height: number): ExternalRect;

    getSelectedEditHandle(): EditHandle | null;

    /** Returns the current shared session name. If we are not sharing,
     * then return ""
     */
    getSharedSessionName(): string;

    /** Returns the current outline colour for future actions. */
    getStrokeColour(): string;
    /** Returns the touch radius for the given mouse event in document pixels. Takes into account whether a pointer was used,
     * as well as the configured touch radius and the zoom scaling.
     */
    getTouchRadius(ev: Event): number;

    getEditHandleType(id: NodeID, handle: EditHandle): string | null;
    setEditHandle(id: NodeID, handle: EditHandle, type: string): boolean;
    getSessionKeys(): { name: string, value: any; }[];
    getSelectedNodes(expandGroups?: boolean): NodeID[];
    getPropertySummary(nodes?: NodeID[]): PropertySummary;
    getViewRectangle(): ExternalRect;
    goToRevision(rev: string | null): void;

    /** Returns true if Zwibbler will respond to keyboard events. See also focus() */
    hasFocus(): boolean;

    /**
     Prompt the user to open a file from their computer.
    */
    openFile(options: OpenFileArgsReturnsString): PromiseLike<{
        data: string;
        contentType: string;
    }>;

    openFile(options: OpenFileArgsReturnsArrayBuffer): PromiseLike<{
        data: ArrayBuffer;
        contentType: string;
    }>;

    openFile(options: OpenFileArgsReturnsFile): PromiseLike<{
        data: File;
        contentType: string;
    }>;

    /** Insert an image and size it to fit in the viewport. If the url property
     * is missing, prompts the user to select and image from her computer.
     */
    insertImage(props?: Properties, docX?: number, docY?: number): Promise<NodeID>;

    /** Insert a page. The page number will be the current page. */
    insertPage(): number;

    /** Insert a page at the given zero-based index. */
    insertPage(index: number): number;

    /** Insert a page of the given size. */
    insertPage(index: number, width: number, height: number): number;

    isLayerVisible(name: string): boolean;
    isNodeSelected(id: NodeID): boolean;
    isPointOverCanvas(pageX: number, pageY: number): boolean;
    isPointOverHandle(docX: number, docY: number, radius: number): boolean;
    load(format: string, data?: any): boolean;
    lockUpdates(timeout: number): void;
    markChangesSent(changes: string): void;
    moveDown(nodes?: NodeID[] | NodeID): void;
    movePage(from: number, to: number): void;
    moveUp(nodes?: NodeID[] | NodeID): void;
    newDocument(): void;
    nextPage(): void;
    on(name: "blur", fn: () => void): this;
    on(name: "broadcast", fn: (data: string) => void): this;
    on(name: "node-clicked", fn: (node: NodeID, x: number, y: number) => void): this;
    on(name: "colour-clicked", fn: (colour: string, useFill: boolean) => string): this;
    on(name: "connected", fn: () => void): this;
    on(name: "connect-error", fn: (error: Error) => void): this;
    on(name: "document-changed", fn: (info: { remote: boolean; }) => void): this;
    on(name: "double-click", fn: (x: number, y: number, node: NodeID) => void): this;
    on(name: "drop-shape", fn: (detail: DropDetails) => boolean): this;
    on(name: "destroy", fn: () => void): this;
    on(name: "draw", fn: (canvasContext: ICanvasContext) => void): this;
    on(name: "start-transform", fn: (details: TransformDetails) => void): this;
    on(name: "hint", fn: (text: string) => void): this;
    on(name: "loading", fn: (busy: boolean) => void): this;
    on(name: "local-keys", fn: () => void): this;
    on(name: "nodes-added", fn: (nodes: NodeID[]) => void, _unused: any, remote: boolean): this;
    on(name: "nodes-removed", fn: (nodes: NodeID[], properties: { [key: string]: Properties; }) => void, remote: boolean): this;
    on(name: "nodes-changed", fn: (nodes: NodeID[]) => void, _unused: any, remote: boolean): this;
    on(name: "paste", fn: (file: File, docX: number, docY: number) => boolean): this;
    on(name: "selected-nodes", fn: () => void): this;
    on(name: "set-page", fn: (pageNumber: number) => void): this;
    on(name: "set-keys", fn: (changed: { name: string, value: any; }[]) => void): this;
    on(name: "tool-changed", fn: (toolName: string) => void): this;
    on(name: "resize", fn: () => void): this;
    on(name: "scroll", fn: () => void): this;
    on(name: "session-error", fn: (e: Error) => void): this;
    on(name: "resource-loaded", fn: () => void): this;
    on(name: string, fn: EventFn): this;
    onComplete(fn: (arg?: any) => void): void;
    onNewDocument(): void;
    openFromComputer(extension: string): PromiseLike<this>;
    paste(data?: string): NodeID[];
    previousPage(): void;
    print(pageSpec: number | number[], rectIn: ExternalRect): void;
    redo(): void;
    redraw(fn?: (ctx: ICanvasContext) => void): void;
    removeListener(name: string, fn: (arg?: any) => void): void;
    resize(): void;
    save(format?: string, erect?: ExternalRect, maxWidth?: number): any;
    save(options: SaveOptionsReturnsString): string;
    save(options: SaveOptionsReturnsBlob): Blob;
    setCursor(cursor: string): void;

    /** This tool, if set, is checked before doing anything and may override behaviour of any tool */
    setCustomMouseHandler(tool: CustomTool): void;

    setToolProperty(name: string, value: any): void;
    selectNodes(nodes: NodeID[] | NodeID): void;
    sendToBack(idsin?: NodeID[] | NodeID): void;
    setActiveLayer(layerName: string): void;
    setConfig(name: string, value: any): void;
    setColour(colour: string, useFill: boolean): boolean;
    setCurrentPage(index: number): void;
    setCustomBackgroundFn(fn: BackgroundFn): void;
    setCustomSelectionRectangleFn(fn: DrawCustomSelectionRectangleFn | null): void;
    setDocumentProperty(name: string, value: any): void;
    setDocumentSize(width: number | null, height: number | null): void;
    setDocumentSizeInTransaction(width: number, height: number): void;
    setDomElement(id: NodeID, element: HTMLElement): void;
    setDomNode(ExtNodeID: NodeID, element: HTMLElement): void;
    getDomElement(id: NodeID): HTMLElement | null;
    /** Sets the draw order of the node in its parent. */
    setDrawOrder(id: NodeID, order: number): void;

    getNodeFromElement(el: HTMLElement): NodeID | null;
    getNodeObject(id: NodeID): NodeContext | null;
    getNodesInRectangle(rect: ExternalRect, options?: SelectOptions): NodeID[];
    setLayerName(oldName: string, newName: string): void;
    setPageBackground(pageNo: number, background: string): void;

    /** Set the paper size to a precise size. */
    setPaperSize(width: number, height: number): void;

    /** Set the paper size to a named size, such as letter, legal, tabloid, a4. */
    setPaperSize(size: string, landscape?: boolean): void;

    /**
     * Set an internval that is automatically cancelled if Zwibbler is destroyed.
     */
    setInterval(fn: () => void, ms: number): number;

    setItemProperty(id: NodeID, property: string, value: any): void;

    /**
     * Set multiple properties of a given node.
     * @param id id of the node
     * @param properties dictionary of properties
     */
    setNodeProperties(id: NodeID | NodeID[], properties: any): void;
    setNodeProperty(id: NodeID | NodeID[], property: string, value: any): void;
    setNodeVisibility(idsIn: NodeID | NodeID[], visible: boolean): void;
    setOpacity(opacity: number, useFill: boolean): void;
    setPageSize(pageNo: number, x: number, y: number, width: number, height: number): void;
    setPageSize(pageNo: number, width: number, height: number): void;
    setPageView(shown: boolean): void;
    setProperties(obj: any): void;
    setProperty(name: string, value: any): void;

    /**
     * Set temporary properties for nodes. These properties are not part of the document, but are
     * used to temporarily override the properties of the document. For example, while moving a shape,
     * we set new temporarily properties each time the user moves the mouse before finally committing them.
     * Temporary properties are returned by getNodeProperty(). 
     * 
     * Temporary properties are also transmitted to other users in the same session. Use clearTemporaryProperties()
     * to clear them.
     */
    setTemporaryProperties(id: NodeID | NodeID[], properties: Properties): void;
    setTemporaryProperty(id: NodeID | NodeID[], name: string, value: any): void;

    /**
     * Set a timeout that is automatically cancelled if Zwibbler is destroyed.
     */
    setTimeout(fn: () => void, ms: number): number;

    /**
     * Scroll/zoom to the specified document rectangle
     * @param rect Rectangle to set the viewing area to, in document coordinates. 
     * @param confine (Default: true) Set to false to allow any move. Otherwise, 
     *        confine the rectangle to the document area, if applicable.
     */
    setViewRectangle(rect: ExternalRect, confine?: boolean): void;
    setZoom(zoom: string | number, x?: number, y?: number): void;
    showLayer(layerName: string, shown?: boolean): void;
    snap(x: number, y: number, snap?: number): ExternalPoint;
    snap(x: number, y: number, e: HasKeys): ExternalPoint;

    /** Stop editing node text.
     * @param commit If set to false, changes are discarded.
     * @return NodeID, if any.
     */
    stopEditingText(commit: boolean): NodeID;

    /** Returns a string showing the hierarchal relationship of all nodes. */
    toDebugString(): string;
    isFullscreenSupported(): boolean;
    toggleFullscreen(el?: any): void;
    translateNode(id: NodeID | NodeID[], x: number, y: number): false | void;
    removePanel(div: HTMLElement): void;
    removeSelectionHandles(): void;
    rotateDocument(angleInRadians: number): void;
    rotateNode(idsIn: NodeID[] | NodeID, angleInRadians: number, x?: number, y?: number): boolean;
    rotatePage(page: number, angle: number): void;
    scaleNode(id: NodeID | NodeID[], sx: number, sy: number, ox?: number, oy?: number): boolean;
    setNodeTransform(id: NodeID | NodeID[], a: number, b: number, c: number, d: number, e: number, f: number): boolean;
    showColourPicker(x: number, y: number): Promise<string>;
    showColourPicker(property: string, x: number, y: number): void;
    createSharedSession(name?: string): string;
    joinSharedSession(name?: string, allowCreate?: boolean): Promise<void>;

    /** Pauses or resumes sending updates to the shared session. Used for testing. */
    pauseSharedSession(paused: boolean): void;
    stopSharing(): void;
    leaveSharedSession(): void;
    undo(): void;
    ungroup(ids?: NodeID | NodeID[]): void;
    upload(form: HTMLFormElement, message?: string): {
        success: (fn: (response: any, xhr: XMLHttpRequest) => void) => any;
        error: (fn: (xhr: XMLHttpRequest) => void) => any;
    };
    useArrowTool(properties?: any, singleLine?: boolean): void;
    useArrowTool(properties?: Properties, arg?: LineToolOptions): void;

    useBrushTool(properties?: Properties): void;
    useBrushTool(colour: string, thickness: number): void;
    useCircleTool(properties?: any, options?: DrawShapeOptions): void;

    /** Activate the curve tool, with the given properties.
     * @return false if we are in readOnly mode.
     */
    useCurveTool(properties?: Properties): void;
    useCustomTool(methods: CustomTool): void;
    useEditHandleTool(id: NodeID): void;
    useEllipseTool(properties?: any, options?: DrawShapeOptions): void;
    useFreehandTool(): void;
    useFreehandTool(properties: any, mode?: string): void;
    useFreehandTool(colour: string, thickness: number, mode?: string): void;
    useStampTool(urlOrObject: any, multiStamp?: boolean): void;
    useLineTool(properties: Properties, singleLine: boolean, orthogonal?: boolean): void;
    useLineTool(properties?: Properties, arg?: LineToolOptions): void;
    usePanTool(): void;
    usePickTool(): void;
    usePolygonTool(numSides: number, rotation?: number, innerReduction?: number, properties?: {},
        options?: DrawShapeOptions): void;
    useQuadraticBezierTool(properties?: any): void;
    useRectangleTool(properties?: any, options?: DrawShapeOptions): void;
    useRoundRectTool(properties?: any, options?: DrawShapeOptions): void;
    useShapeBrushTool(colour?: any, thickness?: number): void;
    useShapeTool(nodeType: string, properties: any, width: number, height: number, dragStyle?: DragStyle, autoPickTool?: boolean): void;
    useShapeTool(nodeType: string, properties: any, width: number, height: number, options?: DrawShapeOptions): void;
    useSquareTool(properties: any, options?: DrawShapeOptions): void;
    useTextTool(properties?: any): void;
    zoomIn(): void;
    zoomOut(): void;

    addGridColumn(node: NodeID, width: number, index?: number): void;
    addGridRow(node: NodeID, height: number, index?: number): void;
    setGridColumn(node: NodeID, index: number, width: number): void;
    setGridRow(node: NodeID, index: number, height: number): void;
    addNodeToGrid(grid: NodeID, child: NodeID, where: CellSpec): void;
    createGridNode(spec: GridSpec, props?: Properties): NodeID;
    deleteGridColumn(node: NodeID, index: number): void;
    deleteGridRow(node: NodeID, index: number): void;
    getGridCell(node: NodeID): GridCellSpec | null;

    getGridSize(node: NodeID): { rows: number, columns: number; } | null;
}

export type Properties = IAny;
export interface IAny {
    [key: string]: any;
}

export interface MainScope<Globals = IAny> extends IAny {
    "ctx": ZwibblerContext<Globals>;
    "showPopup"(name: string, args?: ShowPopupArgs): void;
    "hidePopup"(name: string): void;
}

export interface Scope<Globals = IAny> extends MainScope<Globals> {
    "ctx": ZwibblerContext<Globals>;
    "element": HTMLElement;
    "id": string;
    "parent": Scope;
    "children": Scope[];
    "ze": null;
    "type": string;
    "props": Properties;
}

type ControllerFn<ScopeClass> = (scope: ScopeClass) => void;

export interface ComponentWithProperties<ScopeClass extends Scope = Scope> extends Component {
    "propertyPanel"?: string;
    "propertyPanelController"?: ControllerFn<ScopeClass>;
    "defaults"?: any;
    "controller"?: ControllerFn<ScopeClass> | null;
    "format"?: (this: ComponentWithProperties<ScopeClass>) => void;
    "draw"?: (scope: ScopeClass, context: ICanvasContext) => void;
}

export interface Component {
    "properties"?: string[];
    "style"?: string;
    "template"?: string | HTMLElement;
    "controller"?: ((scope: any, info: DirectiveContext) => void) | null;
}

export interface PanelComponent extends Component {
    "insertAfter"?: string; // selector
    "insertBefore"?: string; // selector
}

export interface DirectiveContext<ElementType = HTMLElement> {
    "scope": any;
    "element": ElementType;
    "name": string;
    "value": string;
    "emit"(eventName: string, arg: any): void;
    "listen"(eventName: string, fn: (this: ElementType, e: any) => void): void;
    "listen"(eventName: string, el: ElementType, fn: (this: ElementType, e: any) => void): void;
    "watch"(expr: string, changeFn: (newValue: any) => void): void;
    "eval"(expr: string): any;
    "destructor"(fn: () => void): void;
}

export type NodeID = string;
export type NodeIDs = NodeID | NodeID[];

export interface ToolbarItem {
    "toolName"?: string;
    "onclick"?: (this: HTMLElement, ctx: ZwibblerContext, e: Event) => void;
    "title"?: string;
    "background"?: string;
    "image"?: string;
    "html"?: string;
}

export interface ShowPopupArgs {
    "x"?: number;
    "y"?: number;
    "refElement"?: HTMLElement;
    "showPosition"?: string | null;
    "clickToDismiss"?: string | null;
    "parent"?: Element;
    "onhide"?: () => void;

    // Overlay colour (default: "transparent")
    "overlay"?: string;
}


export interface ExternalPoint {
    "x": number;
    "y": number;
}

export interface ExternalRect extends ExternalPoint {
    "width": number;
    "height": number;
    "toString"?: () => string;
}

/** This represents a transformation matrix. It is layed out as follows:
 *  [ m11  m12  dx ]
 *  [ m21  m22  dy ]
 *  [   0    0   1 ]
 */
export interface ExternalMatrix {
    m11: number;
    m12: number;
    m21: number;
    m22: number;
    dx: number;
    dy: number;
}

export interface ICanvasDrawContext {
    arc(x: number, y: number, radius: number, sa: number, ea: number, counterclockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    beginPath(): void;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(x1: number, y1: number, x2: number, y2: number): void;
    bezierCurveTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    rect(a: number, b: number, c: number, d: number): void;
}
export declare type HTMLImageSource = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
export declare type ICanvasPattern = {};
export declare type ICanvasGradient = {
    addColorStop(offset: number, color: string): void;
};

/** 
 * The ICanvasContext is a subset of behaviour of HTML canvas.
 * Zwibbler guarantees to implement this on SVG, PDF, as well as on-screen.
 */
export interface ICanvasContext extends ICanvasDrawContext {
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    getTransform?(): DOMMatrix; // not supported everywhere.
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    translate(x: number, y: number): void;
    rotate(a: number): void;
    scale(x: number, y: number): void;
    stroke(): void;
    fill(): void;
    fillText(text: string, x: number, y: number): void;
    strokeText(text: string, x: number, y: number): void;
    fillRect(x: number, y: number, width: number, height: number): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
    save(): void;
    restore(): void;
    measureText(s: string): {
        width: number;
    };
    drawImage(image: HTMLImageSource, dx: number, dy: number): void;
    drawImage(image: HTMLImageSource, dx: number, dy: number, dWidth: number, dHeight: number): void;
    drawImage(image: HTMLImageSource, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): ICanvasGradient;
    setLineDash(dashes: number[]): void;
    clip(): void;
    textBaseline: string;
    fillStyle: IFillStyle;
    strokeStyle: IFillStyle;
    globalCompositeOperation: string;
    globalAlpha: number;
    lineWidth: number;
    ZwibblerBackgroundPattern?: CanvasPattern | null;
    font: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    shadowColor: string;
    lineJoin: string;
    lineCap: string;
    lineDashOffset: number;
    miterLimit: number;

    /** In SVG, starts a new &lt;g> tag with the given attributes. */
    pushGroup?(attributes: {
        [key: string]: string;
    }): void;

    /** In SVG, closes a &lt;g> tag previously opened with pushGroup. */
    popGroup?(): void;

    createPattern(src: HTMLImageSource, how: string): CanvasPattern | null;
}

type IFillStyle = string | ICanvasPattern | ICanvasGradient;

export interface PropertySummary {
    properties: Properties;
    types: { [key: string]: true; };
    nodes: NodeID[],
    empty: boolean;
}

export interface OpenFileArgs {
    /** Example: "".jpg,.png" */
    accept?: string;
    format?: "text" | "data-uri" | "ArrayBuffer" | "File";

    // When set, the camera will be used.
    capture?: "" | "user" | "environment";
}

export interface OpenFileArgsReturnsString extends OpenFileArgs {
    format: "text" | "data-uri";
}

export interface OpenFileArgsReturnsArrayBuffer extends OpenFileArgs {
    format: "ArrayBuffer";
}

export interface OpenFileArgsReturnsFile extends OpenFileArgs {
    format: "File";
}

export interface LineToolOptions {
    /** When set, only one line segment can be drawn. */
    singleLine?: boolean;

    /** When set, only horizontal, vertical, or diagonal lines can be drawn. */
    orthogonal?: boolean;

    /** When set, it will not be possible draw closed polygons. */
    open?: boolean;

    /** When set to false, the user will be able to draw multiple successive lines
     * without having to select the tool again. Default: true
     */
    autoPickTool?: boolean;
}

type EventFn = (...args: any[]) => void;

export interface NodeContext extends NodeScope {
    ctx: ZwibblerContext;
}

// A proxy that wraps properties of a node, calling the appropriate set functions.
export interface NodeScope {
    id: string;
    type: string;
    props: Properties;
    parent: NodeScope | null;
    element?: HTMLElement;
    children: NodeScope[];
}

export interface ZwibblerButton {
    "name": string;
    "image": string;
    "onclick": (e: ZwibblerContext) => void;
}

export interface CustomTool {
    enter?(): void;
    leave?(): void;
    onMouseClick?(x: number, y: number, e: Event): void | false;
    onDoubleClick?(x: number, y: number, e: Event): void | false;
    onKeyCommand?(action: string, e: KeyboardEvent): void | false;
    onMouseDown?(x: number, y: number, e: Event): void | false;
    onMouseUp?(x: number, y: number, e: Event): void | false;
    onMouseMove?(x: number, y: number, e: Event): void | false;
    onMouseLeave?(x: number, y: number, e: Event): void | false;
    onMouseWheel?(x: number, y: number, change: number, e: Event): void | false;
    onMouseDrag?(x: number, y: number, e: Event, startX: number, startY: number): void | false;
    onContextMenu?(x: number, y: number, e: Event): void | false;
    onColour?(colourName: string): void | false;
    onOpacity?(opacity: number): void | false;
    onRedraw?(canvasCtx: ICanvasContext): void | false;
    onGesture?(e: IGestureEvent): void | false;
    getToolName?(): string;
    getToolProperties?(): Properties;
    getToolNodeTypes?(): string[];
    setToolProperty?(name: string, value: any): void;
}

export interface IGestureEvent {
    rotation: number;
    scale: number;
}

export interface DrawOptions {
    /** What page to draw. Default is current page. */
    page?: number;

    /** A hint of the scale to use, for memory efficiency. If not provided, it will 
     * be deduced from the canvas where possible.
     */
    scaleHint?: number;
}

export type AlignRule = "top" | "middle" | "bottom" | "left" | "centre" | "right";

export interface PaletteOptions {
    onColour(colour: string, rightButton: boolean): void;
    onOpacity(opacity: number, rightButton: boolean): void;
}

export interface DropDetails {
    docX: number,
    docY: number,
    nodes: {
        id: NodeID,
        shift: IPoint,
        rect: ExternalRect,
    }[],
}

export interface TextOptions {
    "text": string;
    "width"?: number;
    "height"?: number;
    "font"?: string;
    "valign"?: string;
    "halign"?: string,
    "textDecoration"?: string;
}

export interface FormattedText {
    "draw"(ctx: ICanvasContext, x: number, y: number): void;
    "width": number;
    "height": number;
}

export interface Decoration {
    appliesTo?(node: NodeID, ctx: ZwibblerContext): boolean;
    xoffset?: number;
    yoffset?: number;
    x?: number;
    y?: number;
    width?: number;
    onclick?(node: NodeID, ctx: ZwibblerContext, e: Event): void;
    image?: string;
    hoverImage?: string;
}

export interface EColour {
    /** Red value between 0 and 1 */
    "r": number,
    /** Green value between 0 and 1 */
    "g": number,
    /** Blue value between 0 and 1 */
    "b": number,
    /** opacity value between 0 and 1 */
    "a": number;
}

export type BackgroundFn = (ctx: ICanvasContext, x: number, y: number, width: number, height: number) => void;

export interface EMatrix {
    m11: number;
    m12: number;
    m21: number;
    m22: number;
    dx: number;
    dy: number;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface FormatterInterface {
    formatFill(ctx: ICanvasContext, name: string, fillStyle: string): void;
    getFill(name: string): IFillStyle;
    reformat(): void;
    loadImage(url: string, fn: (img: HTMLImageElement, url: string) => void): void;
    fillEraser(ctx: ICanvasContext): void;
    strokeEraser(ctx: ICanvasContext): void;
    formatText(ctx: ICanvasContext, o: TextOptions): FormattedText;
    parseFront(font: string): ParsedFont;
    getConfig(key: string): any;
    transformPoint(x: number, y: number): IPoint;
    untransformPoint(x: number, y: number): IPoint;
    transformCanvas(ctx: ICanvasContext): void;
    untransformCanvas(ctx: ICanvasContext): void;
    getTransform(): EMatrix;
    getNodeObject(): NodeScope;
    getProperty(name: string): any;

    /** Returns a property of this node. */
    getProperty(name: string): any;

    /**
     * Returns true if the given node exists. This node must be in the list returned
     * by getDependencies(). If not, an error will be thrown.
     */
    isNode(node: NodeID): boolean;

    /** Returns a property of another node in the document. This node must be in the list returned
     * by getDependencies() of your custom node.
     */
    getNodeProperty(node: NodeID, name: string): any;
    getNodeRectangle(node: NodeID): ExternalRect;

    /* Returns the zoom level of the drawing. */
    getZoomLevel(): number;

}

export interface CustomNode {
    /** This method must return bounding box of the node,
     * before its transformation matrix is applied.
     */
    getUntransformedRect(): ExternalRect;

    /** By default, Zwibbler will use the rectangle and the transformation matrix to 
     * determine the bounds of your shape and to tell if the user clicked on it. If you
     * have a more detailed way, you can use it here. For example, a diagonal line should
     * return true if the user clicks near it, rather than allowing clicks anywhere in its
     * bounding rectangle.
     * 
     * x and y are the coordinates relative to the document. When performing the test, you
     * should take into account the transformation matrix, perhaps by calling
     * formatter.untransformPoint(x, y) to move it into the coordinate space of the shape.
     * 
     * @param radius is the amount by which to extend outside of the object and still allow
     *  selecting the object. It has been pre-multiplied to take the zoom-level into account.
     * @param zoomLevel is the current zoomlevel which has been already used to calculate radius.
    */
    hittest?(x: number, y: number, radius: number, zoomLevel: number): boolean;

    /** If you wish, you can intercept properties here. */
    setProperty?(name: string, value: any): void;
    getProperty?(name: string): any;


    /**
     * Edit handles are small points on the shape that can be dragged. For example, the
     * endpoints of a line or the corners of a polygon. Return true if this shape has an edit 
     * mode.
     * 
     * The locations of the edit handle must be defined by the nodes properties somehow.
     * You should implement either getEditHandles() or hittestEditHandle()
    */
    hasEditMode?(): boolean;

    /**
     * Return a list of edit handles on the untransformed version of this shape.
     * 
     * For more detailed control, you may instead implement hittestEditHandle.
     */
    getEditHandles?(): IPoint[];

    /**
     * Alternatively, if edit handles cannot be defined by a single point, implement this
     * to test for them. If not near an edit handle, return null.
     * 
     * @param x is the location to test
     * @param y is the location to test
     * @param radius is the radius to test, which takes into account zoom and whether the user is using touch.
     * @param scaleUsed is the zoom, which is already taken into account for the radius.
     */
    hittestEditHandle?(x: number, y: number, radius: number, scaleUsed: number): EditHandle | null;

    /**
     * Nodes are fully defined by their properties. This method should return the properties
     * that would change if the given edit handle is moved to the given coordinate.
     * After calling this, Zwibbler may later call setProperty() with the changes.
     * The snapped parameter corresponds to whether the user was holding down control or some other key
     * and whether snapping is enabled. It allows the node itself to perform additional snapping
     * other than to grid points. The x,y have aready been adjusted for the grid-point snapping, if
     * applicable.
     */
    moveEditHandle?(index: EditHandle, x: number, y: number, snapped: boolean): Properties;

    /**
     * This should return the properties that would change by applying the given transformation 
     * matrix. By default, this returns {"matrix": xform}
     * 
     * It is called when the user is moving or scaling the shape.
     * 
     * If different properties change by applying the transform, then return them here.
     * The properties should not be applied; Zwibbler will later call setProperty() to apply them.
     */
    applyTransform?(xform: ExternalMatrix): Properties;

    /**
     * Zwibbler will call this if the node is hidden using the setNodeVisibility method.
     */
    setHidden?(hide: boolean): boolean;

    /**
     * This method is called while editing text to temporarily hide the text,
     * so that it does not overlap with what the user is typing in the edit box.
     */
    setTextHidden?(hide: boolean): void;

    /**
     * The format method may be implemented for efficiency. Whenever setProperty is called by 
     * Zwibbler, the node is then formatted before being drawn. You can put more expensive
     * calculations in format, rather than re-doing them whenever the document is drawn.
     * 
     * You can use the FormatterInterface passed in the constructor for various tasks that you
     * may need when formatting and drawing graphics and dealing with the current transformation 
     * matrix.
     */
    format?(ctx: ICanvasContext): void;
    draw(ctx: ICanvasContext): void;

    /** Return true if, upon clicking the node, it should immediately enter 
     * edit handle mode instead of showing the selection box.
     */
    shouldEditOnSelect?(): boolean;

    /** Return true if the edit handles are always availble to be clicked on, regardless of whether
     * the object is selected or not.
     */
    hasAlwaysOnEditHandles?(): boolean;

    /** Return a list of other nodes in the document that this node depends on. Whenever one of 
     * these nodes changes, your format() method will be called again. You must implement
     * replaceDependencies() if you implement this method.
     */
    getDependencies?(): NodeID[];

    /**
     * Returns a list of properties that need to be changed replacing the given nodes with
     * other ones. This is necessary to implement copy/paste.
     */
    replaceDependencies?(replacements: { [nodeid: string]: string; }): Properties;

    /**
     * Guaranteed to be called when the node is removed from the document.
     */
    destroy?(): void;
}

type CustomNodeClass = new (id: NodeID, formatter: FormatterInterface) => CustomNode;

export interface ParsedFont {
    fontFamily: string;
    fontSize: string;
    fontStyle: string;
    fontWeight: string;
    fontVariant: string;
    lineHeight: string;
}

export interface Popup {
    destroy(): void;
    show(x: number, y: number, clickToDismiss?: boolean, modal?: boolean): void;
    hide(): void;
    onshow(): void;
    onhide(): void;
    isShown(): boolean;
}

export type EditHandle = string | number | { getCursor(): string; };

export interface GridSpec {
    columns: number[],
    rows: number[],
}

export interface CellSpec {
    column: number,
    row: number,
    endColumn?: number,
    endRow?: number,
    sticky?: "row" | "column" | "",
    // If set, and the cell takes up the entire row/column, it will expand as 
    // columns and rows are inserted.
    // rows: the column will extend from top to bottom
    // columns: The row will extend from left to right.
    span?: "none" | "horizontal" | "vertical",
}

export interface GridCellSpec extends CellSpec {
    gridID: NodeID;
}

export interface PdfContext extends ICanvasContext {
    download(filename: string): void;
}

export interface TransformDetails {
    transformType: string;
    nodes: NodeID[];
}

/**
 * Used for the setCustomSelectionRectangleFn() method
 */
export interface DrawSelectionRectParameters {
    // The canvas on which to draw. It has already been transformed
    // based on the user's zoom level and scrolling.
    ctx: ICanvasContext;

    // The node which we are drawing the rectangle around
    node: NodeID;

    // Rectangle to draw, before transformations are applied.
    // It is best to use the points array instead, since
    // the matrix may have affected it.
    rect: ExternalRect;

    // The current scale of the canvas. You should
    // divide the lineWidth you are using by this amount to achieve the 
    // lineWidth you want in screen pixels.
    scale: number;

    // The matrix which has been applied to the corners of the rectangle
    // to obtain the points.
    matrix: ExternalMatrix;

    // The four corners of the rectangle, after node-specific
    // transformations have been applied. This is what you 
    // should draw.
    points: IPoint[];
}

export type DrawCustomSelectionRectangleFn = (args: DrawSelectionRectParameters) => void;

export type DragStyle = "rectangle" | "circle" | "rectangle-tl";

export interface DrawShapeOptions {
    // Set to true if user should be be prompted for text immediately after 
    // drawing the shape.
    textEntry?: boolean;

    // Use "rectangle" to drag from top-left to bottom-right,
    // "circle" if the shape should expand outwards from the centre.
    // Both assume origin at centre of the shape. Use "rectangle-tl"
    // if the origin is actually at the top-left.
    dragStyle?: DragStyle;

    // If set, override the configuration setting for "autoPickTool".
    // true means we return to the pick tool immediately after drawing the shape.
    // False means we will allow the user to continue drawing more shapes.
    autoPickTool?: boolean;
}

export interface ITranslate { 
    translateX: number;
    translateY: number;
}

// Represents something with a height and width.
export interface ISize {
    width: number;
    height: number;
}

// Returned by getRevisionInfo()
export interface RevisionInfo {
    // The unique identifier of the change.
    cid: string;

    // Timestamp, as returned by Date.getTime(), in milliseconds
    ts: number;

    addedIDs: NodeID[];
}

// used for getNodesInRectangle()
export interface SelectOptions {
    selectMode?: "surround" | "overlap"; // default is the configuration setting.
    radius?: number;
}