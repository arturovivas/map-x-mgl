/* jshint evil:true, esversion:6  */

export function createViewIcon(opt){
  var el = mx.helpers.el;
  return el("span",
    {
      class : opt.tooltipClasses || "hint--left",
      dataset : {
        lang_type: 'tooltip',
        lang_key : opt.tooltipKey || ""
      }
    },  
    el("i",
      {
        class : opt.iconClasses || ["fa","fa-check-circle"] 
      }
    )
  );
}

export function setViewBadges(view){
  view = view || {};
  var h = mx.helpers;
  var cl;
  var elIconPublicValid,elIconPublicNotValid,elIconShared,elIconEdit;
  var elBadges = document.createElement("div");
  var readers = view.readers || [];
  var hasEdit = view._edit === true;
  var isValidable = view.type == "rt" || view.type == "vt";
  var hasPublic = readers.indexOf("public") > -1;
  var isShared = view.project !== mx.settings.project;
  var elViewBadgesContainer = document.getElementById("view_badges_" + view.id);
  if(!elViewBadgesContainer) return;
  elViewBadgesContainer.innerHTML = "";
  elViewBadgesContainer.appendChild(elBadges);
  elBadges.classList.add("mx-view-badges");
  
  if( hasPublic ){  
    elIconPublicValid = createViewIcon({
      iconClasses : ["mx-view-public-valid","fa","fa-check-circle"],
      tooltipClasses : ["hint--left"],
      tooltipKey : "view_public_valid"
    });
    /**
    * Add public badge
    */
    elBadges.appendChild(elIconPublicValid);

    /**
    * Check if it's valid, add the validate badge
    */
    if( isValidable ){
      /**
       * Validate asynchronously metadata
       */
      h.validateMetadataView(view)
        .then( validation => {
          
          if( ! validation.valid ){
            /**
             * Add not valid badge
             */
            var results = h.path(validation,'results');
            elIconPublicNotValid = createViewIcon({
              iconClasses : ["mx-view-public-not-valid","fa","fa-exclamation-triangle"],
              style : {
                color : "red"
              },
              tooltipClasses : ["hint--left"],
              tooltipKey : "view_public_not_valid"
            });

            elIconPublicNotValid.addEventListener("click",function(e){
              e.preventDefault();
              e.stopPropagation(); // don't propagate to view oppening
              h.getDictItem("validate_meta_title")
                .then( title => {
                  h.modal({
                    id : "modal_validation_metadata",
                    replace : true,
                    title : title,
                    content : h.validationMetadataTestsToHTML(results)
                  });
                });
            });

            elBadges.appendChild(elIconPublicNotValid);
            mx.helpers.onNextFrame(()=>{
              h.updateLanguageElements({
                el: elBadges
              });
            });
          }else{
            //console.log( { view : view.id, msg: "validation passed" });
          }
        });
    }

  }

  if( isShared ){ 
    /**
    * Add shared badge
    */
    elIconShared = createViewIcon({
      iconClasses : ["fa","fa-share-alt-square"],
      tooltipClasses : ["hint--left"],
      tooltipKey : "view_shared"
    });
    elBadges.appendChild(elIconShared);
  }

  /**
  * Add editable badge
  */
  elIconEdit = createViewIcon({
    iconClasses : ["fa", hasEdit ? "fa-unlock" : "fa-lock" ],
    tooltipClasses : ["hint--left"],
    tooltipKey : hasEdit ? "view_editable" : "view_locked"
  });

  elBadges.appendChild(elIconEdit);

}

export function updateViewsBadges(o){
  o = o || {};
  var h = mx.helpers;
  var views = h.getViews({asArray:true});
  views.forEach(v => {
    mx.helpers.onNextFrame(()=>{
      mx.helpers.setViewBadges(v);
    });
  });
}
