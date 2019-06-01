const clusterManagementPayload = require('./payload/cluster-management-config');
const clusterManagementNotification = require('./payload/cluster-management-notification');
const clusterManagementDelete = require('./payload/cluster-management-delete');


module.exports = function handleSlackPayload(payload) {
  if (payload.actions[0].value === '[ClusterManager]SelectCluster') {
    return clusterManagementPayload;
  }
  
  if (payload.actions[0].value === '[ClusterManager]ConfigDone') {
    return clusterManagementNotification;
  }
  
  switch (payload.actions[0].value) {
    case '[ClusterManager]SelectCluster': 
      return clusterManagementPayload;
    case '[ClusterManager]ConfigDone': 
      return clusterManagementPayload;
    case '[ClusterManager]DeleteCluster': 
      return clusterManagementDelete;
    case '[UplinksManager]DiscoverUplinks': 
      return require('./payload/discover-uplinks');
  }
  
  console.log('+1', payload.actions[0].selected_option.value);
  console.log('+2',  payload.actions[0].selected_option.value.includes('[r'));
  if (payload.actions[0].selected_option && payload.actions[0].selected_option.value.includes('[r')) {
    return clusterManagementDelete;
  }
}


