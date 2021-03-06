
# 
# Main map 
# NOTE: use config file for default.  
#

observe({
  mxCatch("map.R",{

    userRole <- getUserRole()
    project <- reactData$project
    language <- reactData$language
    isMapReady <- isTRUE(reactData$mapIsReady)

    if(isMapReady) return()
    if(noDataCheck(userRole)) return()
    if(noDataCheck(project)) return()
    if(noDataCheck(language)) return()

    #dd <- reactViewsProject()

    timer <- mxTimeDiff("Init map")
    projectData <- mxDbGetProjectData(project)
    mapPos <- projectData$map_position

    #
    # Set map options
    # 
    mapConfig <- list(
      mapPosition = mapPos, 
      colorScheme =  query$style
      )

    # init map
    mglInit(mapConfig)
    mxTimeDiff(timer)
})
})


observeEvent(input$mx_client_ready,{
  reactData$mapIsReady <- !noDataCheck(input$mx_client_ready)
})

