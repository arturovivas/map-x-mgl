/**
 * Shortcut for helpers
 * @ignore
 */
let h;

/**
 * Class to handle MapX specific method
 */
class MapxResolvers {
  constructor(opt) {
    const mr = this;
    mr.opt = Object.assign({}, opt);
    if (!mr.opt.helpers) {
      throw new Error('mx.helpers not found');
    }
    h = mr.opt.helpers;
  }

  /**
   * Set panel visibility
   * @param {Object} opt Options
   * @param {String} opt.panel Name of the panel (views, tools)
   * @param {Boolean} opt.show If true, show the panel (and hide other)
   * @param {Boolean} opt.toggle Toggle the panel
   * @return {Boolean} done
   */
  set_panel_left_visibility(opt) {
    opt = Object.assign({panel: 'views', show: true, toggle: false}, opt);
    h.panelLeftSwitch(opt);
    return true;
  }

  /**
   * Check if mapx has a dashboard
   * @return {Boolean} Has dashboard
   */
  has_dashboard() {
    return !!mx.dashboard && !mx.dashboard._destroyed;
  }

  /**
   * Set dashboard visibility
   * @param {Object} opt Options
   * @param {Boolean} opt.show If true, show the dashboard
   * @param {Boolean} opt.toggle Toggle the dashoard
   * @return {Boolean} done
   */
  set_dashboard_visibility(opt) {
    const mr = this;
    opt = Object.assign({show: true, toggle: false}, opt);
    if (mr.has_dashboard()) {
      if (opt.toggle === true) {
        mx.dashboard.toggle();
      } else if (opt.show === true) {
        mx.dashboard.show();
      } else {
        mx.dashboard.hide();
      }
      return true;
    }
    return false;
  }

  /**
   * Get source metadata
   * @param {Object} opt Options
   * @param {String} opt.idSource Id of the source
   */
  get_source_meta(opt) {
    return h.getSourceMetadata(opt.idSource, opt.force);
  }

  /**
   * Get user id
   * @return {Number} Current user id
   */
  get_user_id() {
    return mx.settings.user.id;
  }

  /**
   * Get user ip info
   * @return {Object} Current user ip object (ip, country, region, etc)
   */
  get_user_ip() {
    return fetch('https://api.mapx.org/get/ip').then((r) => r.json());
  }

  /**
   * Get user roles
   * @return {Object} Current user roles
   */
  get_user_roles() {
    return mx.settings.user.roles;
  }

  /**
   * Get user email
   * @return {String} Current user email
   */
  get_user_email() {
    return mx.settings.user.guest ? '' : mx.settings.user.email;
  }

  /**
   * Set project
   * @param {Object} opt options
   * @param {String} opt.idProject Id of the project to switch to
   * @return {Boolean} Done
   */
  set_project(opt) {
    opt = Object.assign({}, {idProject: null}, opt);
    h.setProject(opt.idProject);
    return true;
  }

  /**
   * Get current language
   * @return {String} Two letters language code
   */
  get_language() {
    return mx.settings.language;
  }

  /**
   * Setlanguage
   * @param {Object} opt Options
   * @param {String} opt.lang Two letters language code
   */
  set_language(opt) {
    return h.updateLanguage(opt);
  }

  /**
   * Get list of supported current languages
   * @return {Array} Array of two letters language code
   */
  get_languages() {
    return mx.settings.languages;
  }

  /**
   * Get projects list
   * @param {Object} opt Project fetching option
   * @return {Array} list of project for the current user, using optional filters
   */
  get_projects(opt) {
    return h.fetchProjects(opt);
  }

  /**
   * Get current project id
   * @return {String} Current project id
   */
  get_project() {
    return mx.settings.project;
  }

  /**
   * Get list of collection for the current project
   * @param {Object} opt Options
   * @param {Boolean} opt.open Return only collections from open views
   * @return {Array} Array of collections names
   */
  get_project_collections(opt) {
    return h.getProjectViewsCollections(opt);
  }

  /**
   * Test if the current user is guest
   * @return {Boolean} User is guest
   */
  is_user_guest() {
    return mx.settings.user.guest === true;
  }

  /**
   * Get list of available views as static objects
   * @return  {Array} Array of views
   */
  get_views() {
    return h.getViewsForJSON();
  }

  /**
   * Get list views with visible layers
   * @return  {Array} Array of views
   */
  get_views_with_visible_layer() {
    return getViewsLayersVisible();
  }

  /**
   * Get list of available views id
   * @return  {Array} Array of id
   */
  get_views_id() {
    return h.getViewsForJSON().map((v) => v.id);
  }

  /**
   * Get list of available views id
   * @return  {Array} Array of id
   */
  get_views_id_open() {
    return h.getViewsOpen();
  }

  /**
   * Get vector view (vt) metadata of the attribute
   * @param {Object} opt Options
   * @param {String} opt.idView Id of the view
   * @return {Object} attribut metadata
   */
  get_view_meta_vt_attribute(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    const view = h.getView(opt.idView);
    if (h.isView(view)) {
      return h.path(view, 'data.attribute', {});
    }
  }

  /**
   * Get view metadata
   * @param {Object} opt options
   * @param {String} opt.idView Id of the view
   * @param {Object} view meta data object
   */
  get_view_meta(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    return h.getViewMetadata(opt.idView, true);
  }

  /**
   * Get view legend
   * @param {Object} opt options
   * @param {String} opt.idView Id of the view
   * @param {String} opt.format
   */
  get_view_legend_image(opt) {
    return h.getViewLegendImage({view: opt.idView, format: opt.format});
  }

  /**
   * Filter view layer by text (if attribute is text)
   * @param {Options} opt Options
   * @return {Boolean} done
   */
  set_view_layer_filter_text(opt) {
    return this._apply_filter_layer_select('searchBox', 'setValue', opt);
  }
  /**
   * Get current search box item
   * @param {Options} opt Options
   * @return {Boolean} done
   */
  get_view_layer_filter_text(opt) {
    return this._apply_filter_layer_select('searchBox', 'getValue', opt);
  }

  /**
   * Filter view layer by numeric (if attribute is numeric)
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @param {Numeric} opt.value Value
   */
  set_view_layer_filter_numeric(opt) {
    return this._apply_filter_layer_slider('numericSlider', 'set', opt);
  }

  /**
   * Filter view layer by time ( if posix mx_t0 and/or mx_t1 attributes exist )
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @param {Numeric | Array} opt.value Value or range of value
   * @return null
   */
  set_view_layer_filter_time(opt) {
    return this._apply_filter_layer_slider('timeSlider', 'set', opt);
  }

  /**
   * Set layer transarency (0 : visible, 100 : 100% transparent)
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @param {Numeric} opt.value Value
   * @return null
   */
  set_view_layer_transparency(opt) {
    return this._apply_filter_layer_slider('transparencySlider', 'set', opt);
  }

  /**
   * Get current numeric slider value
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @return {Number|Array} values
   */
  get_view_layer_filter_numeric() {
    return this._apply_filter_layer_slider('numericSlider', 'get');
  }

  /**
   * Get current time slider value
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @return {Number|Array} values
   */
  get_view_layer_filter_time() {
    return this._apply_filter_layer_slider('timeSlider', 'get');
  }

  /**
   * Get current transparency value for layers of a view
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @return {Number} value
   */
  get_view_layer_transparency() {
    return this._apply_filter_layer_slider('transparencySlider', 'get');
  }

  /**
   * Open a view
   * @param {Object} opt Options
   * @param {String} opt.idView Target view id
   * @return {Boolean} done
   */
  open_view(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    const view = h.getView(opt.idView);
    const valid = h.isView(view);
    if (valid) {
      h.viewOpenAuto(view);
      return true;
    }
  }

  /**
   * Close a view
   * @param {Object} opt Options
   * @param {String} opt.idView Target view id
   * @return {Boolean} done
   */
  close_view(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    const view = h.getView(opt.idView);
    const valid = h.isView(view);
    if (valid) {
      h.viewCloseAuto(view);
      return true;
    }
  }

  /**
   * Download process for raster (rt), geojson (gj) and vector (vt) view
   *
   * <pre>
   * => file : a file downloaded by the browser
   * => url : an url to fetch the data, if available
   * => data : the data. E.g. geojson = object
   * => modal : a modal window inside MapX
   * vt : return {type: "vt", methods: ['modal']}
   * rt : return {type: "rt", methods: ['url'], url:'http://example.com/data'}
   * gj : return {type: "vt", methods: ['file','data'], data:{"type":"FeatureCollection","features":[{"id":"1","type":"Feature","properties":{},"geometry":{"coordinates":[[-11,43],[12,20]],"type":"Point"}}]}}
   *</pre>
   *
   * @param {Object} opt Options
   * @param {String} opt.idView View of the source to download
   * @example
   * mapx.ask('download_view_source_auto',{idView:'MX-GJ-0RB4FBOS8E'})
   * @return {Object} Object with the method to retrieve the source.
   */
  download_view_source_auto(opt) {
    return h.downloadViewAuto(opt.idView);
  }

  /**
   * Show the login modal window
   * @return {Boolean} done
   */
  show_modal_login() {
    const mr = this;
    return mr._shiny_input('btn_control', {value: 'showLogin'});
  }

  /**
   * Show view meta modal window
   * @return {Boolean} done
   */
  show_modal_view_meta(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    const view = h.getView(opt.idView);
    const valid = h.isView(view);
    if (valid) {
      h.viewToMetaModal(view);
      return true;
    }
  }

  /**
   * Show map composer
   * @return {Boolean} done
   */
  show_modal_map_composer() {
    h.mapComposerModalAuto();
    return true;
  }

  /**
   * Show sharing modal window
   * @param {Object} opt Options
   * @param {String} opt.idView Id view to share
   */
  show_modal_share(opt) {
    opt = Object.assign({}, opt);
    const mr = this;
    const view = h.getView(opt.idView);
    const isView = opt.idView && h.isView(view);
    if (isView) {
      return mr._shiny_input('mx_client_view_action', {
        action: 'btn_opt_share',
        target: opt.idView
      });
    } else {
      return mr._shiny_input('btnIframeBuilder');
    }
  }

  /**
   * Show modal for tools
   * @param {Object} opt Options
   * @param {String} opt.tool Id of the tools
   * @param {Boolean} opt.list Return a list of tools
   * @return {Boolean || Array} Done or the list of tools
   */
  show_modal_tool(opt) {
    const mr = this;
    opt = Object.assign({}, opt);
    const roles = h.path(mx, 'settings.user.roles.groups', []);
    const tools = {
      sharing_manager: {
        roles: ['public'],
        id: 'btnIframeBuilder'
      },
      view_add: {
        roles: ['publishers', 'admins'],
        id: 'btnAddView'
      },
      source_validate_geom: {
        roles: ['publishers', 'admins'],
        id: 'btnValidateSourceGeom'
      },
      source_overlap_utilities: {
        roles: ['publishers', 'admins'],
        id: 'btnAnalysisOverlap'
      },
      source_edit: {
        roles: ['publishers', 'admins'],
        id: 'btnEditSources'
      },
      source_metadata_edit: {
        roles: ['publishers', 'admins'],
        id: 'btnEditSourcesMetadata'
      },
      source_upload: {
        roles: ['publishers', 'admins'],
        id: 'btnUploadSourceApi'
      },
      db_temporary_connect: {
        roles: ['publishers', 'admins'],
        id: 'btnShowDbInfoSelf'
      }
    };
    if (opt.list) {
      return Object.keys(tools);
    }
    if (opt.tool) {
      const conf = tools[opt.tool];
      if (!conf) {
        mr._fw.postMessage({
          level: 'error',
          key: 'err_resolver_tool_not_found',
          vars: {idTool: opt.tool}
        });
        return false;
      }
      const allow = conf.roles.reduce((a, r) => {
        return a || roles.indexOf(r) > -1;
      }, false);
      if (!allow) {
       mr._fw.postMessage({
          level: 'error',
          key: 'err_roles_not_match',
          vars: {
            idTool: opt.tool,
            roles: JSON.stringify(conf.roles)
          }
        });
        return false;
      }
      mr._shiny_input(conf.id, {randomNumber: true});
      return true;
    }
    return false;
  }

  /**
   * close all modal windows
   * @return {Boolean} done
   */
  close_modal_all() {
    h.modalCloseAll();
    return true;
  }

  /**
   * Get views current absolute order (without groups)
   * @return {Array}
   */
  get_views_order() {
    return h.getViewsOrder();
  }

  /**
   * Get views list state
   * @return {Array}
   */
  get_views_list_state() {
    const v = h.getMapData().viewsList;
    return v.getState();
  }

  /**
   * Set state / views list order, groups, etc. Opened view will be closed
   * @param {Object} opt Options
   * @param {Array} opt.state Mapx views list state
   */
  set_views_list_state(opt) {
    const v = h.getMapData().viewsList;
    return v.setState({
      render: false,
      state: opt.state,
      useStateStored: false
    });
  }

  /**
   * Set views list order
   * @param {Object} opt Options
   * @param {Boolean} opt.asc Asc
   * @param {String} opt.mode Mode : 'string' or 'date';
   */
  set_views_list_sort(opt) {
    const v = h.getMapData().viewsList;
    return v.sortGroup(null, opt);
  }

  /**
   * Move view on top of its group
   * @param {Object} opt Options
   * @param {Sring} opt.idView
   */
  move_view_top(opt) {
    const v = h.getMapData().viewsList;
    return v.moveTargetTop(opt.idView);
  }
  /**
   * Move view on the bottom of its group
   * @param {Object} opt Options
   * @param {Sring} opt.idView
   */
  move_view_bottom(opt) {
    const v = h.getMapData().viewsList;
    return v.moveTargetBottom(opt.idView);
  }
  /**
   * Move view after anoter view
   * @param {Object} opt Options
   * @param {Sring} opt.idView
   * @param {Sring} opt.idViewAfter
   */
  move_view_after(opt) {
    const v = h.getMapData().viewsList;
    return v.moveTargetAfter(opt.idView, opt.idViewAfter);
  }
  /**
   * Move view before another view
   * @param {Object} opt Options
   * @param {Sring} opt.idView
   * @param {Sring} opt.idViewBefore
   */
  move_view_before(opt) {
    const v = h.getMapData().viewsList;
    return v.moveTargetBefore(opt.idView, opt.idViewBefore);
  }
  /**
   * Move view up
   * @param {Object} opt Options
   * @param {Sring} opt.idView
   */
  move_view_up(opt) {
    const v = h.getMapData().viewsList;
    return v.moveTargetUp(opt.idView);
  }
  /**
   * Move view down
   * @param {Object} opt Options
   * @param {Sring} opt.idView
   */
  move_view_down(opt) {
    const v = h.getMapData().viewsList;
    return v.moveTargetDown(opt.idView);
  }

  /**
   * List resolvers methods
   * @return {Array} array of supported methods
   */
  get_sdk_methods() {
    const mr = this;
    const reg = new RegExp('^_');
    const protos = Object.getPrototypeOf(mr);
    const methods = Object.getOwnPropertyNames(protos).reduce((a, m) => {
      if (!m.match(reg)) {
        a.push(m);
      }
      return a;
    }, []);
    methods.splice(0, 1);
    return methods;
  }

  /**
   * Bind worker
   * @ignore
   * @param {FrameWorker} fw FrameWorker
   */
  _bind(fw) {
    this._fw = fw;
  }

  /**
   * Helper to work with sliders
   * @ignore
   */
  _apply_filter_layer_slider(type, method, opt) {
    opt = Object.assign({}, {idView: null, value: null}, opt);
    const view = h.getView(opt.idView);
    const valid =
      h.isView(view) &&
      h.isObject(view._interactive) &&
      h.isObject(view._interactive[type]) &&
      h.isFunction(view._interactive[type][method]);

    if (valid) {
      return view._interactive[type][method](opt.value);
    }
  }

  /**
   * Helper to work with selectize
   * @ignore
   */
  _apply_filter_layer_select(type, method, opt) {
    type = type || 'searchBox'; // selectize;
    opt = Object.assign({}, {idView: null, value: null}, opt);
    const view = h.getView(opt.idView);
    const valid =
      h.isView(view) &&
      h.isObject(view._interactive) &&
      h.isObject(view._interactive[type]) &&
      h.isFunction(view._interactive[type][method]);

    if (valid) {
      return view._interactive[type][method](opt.value);
    }
  }
  /**
   * Helper to work with shiny
   * @ignore
   */
  _shiny_input(id, opt) {
    if (mx.settings.mode.app) {
      opt = Object.assign({time: new Date()}, opt);
      if (opt.randomNumber) {
        opt = Math.ceil(Math.random() * 1000);
      }
      Shiny.onInputChange(id, opt);
    } else {
      throw new Error('only available in app mode');
    }
    return true;
  }
}

export {MapxResolvers};
