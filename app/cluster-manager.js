const clusterManagementPayload = require('./payload/cluster-management-config');
const clusterManagementNotification = require('./payload/cluster-management-notification');
const clusterManagementDelete = require('./payload/cluster-management-delete');


module.exports = function handleSlackPayload(payload) {
  if (payload.actions[0].value === '[ClusterManager]SelectCluster') {
    return clusterManagementPayload([ 
      {"text": {"type": "plain_text","text": "novsdeploymentstaging-01.nebula.video"},"value": "[CM.SelectCluster]novsdeploymentstaging-01.nebula.video"},
      {"text": {"type": "plain_text","text": "saas-deployment-staging-test-01.nebula.video"},"value": "[CM.SelectCluster]saas-deployment-staging-test-01.nebula.video"},
      {"text": {"type": "plain_text","text": "vos-deploy-ngde3400-13-01.nebula.video"},"value": "[CM.SelectCluster]vos-deploy-ngde3400-13-01.nebula.video"},
      {"text": {"type": "plain_text","text": "replicants-white-01.nebula.video"},"value": "[CM.SelectCluster]replicants-white-01.nebula.video"},
      {"text": {"type": "plain_text","text": "white-walker-01.nebula.video"},"value": "[CM.SelectCluster]white-walker-01.nebula.video"},
      {"text": {"type": "plain_text","text": "replicantsinc-01.nebula.video"},"value": "[CM.SelectCluster]replicantsinc-01.nebula.video"},
      {"text": {"type": "plain_text","text": "corsica-tm2-01.nebula.video"},"value": "[CM.SelectCluster]corsica-tm2-01.nebula.video"},
      {"text": {"type": "plain_text","text": "hkvpurple-01.nebula.video"},"value": "[CM.SelectCluster]hkvpurple-01.nebula.video"},
      {"text": {"type": "plain_text","text": "2-01.nebula.video"},"value": "[CM.SelectCluster]2-01.nebula.video"},
      {"text": {"type": "plain_text","text": "cduval-01.nebula.video"},"value": "[CM.SelectCluster]cduval-01.nebula.video"},
    ]);
  }
  
  if (payload.actions[0].type === 'static_select') {
    // ...
    // if ()
    const [, action, value] = payload.actions[0].selected_option.value.match(/\[\b(.*)\b\](.*)/i);

    switch(action) {
      case 'CM.SelectCluster':
        console.log('RESULT!!::', value);
        break;
    }
    return;
  }

  if (payload.actions[0].value === '[ClusterManager]ConfigDone') {
    return clusterManagementNotification;
  }
  
  switch (payload.actions[0].value) {
    case '[ClusterManager]SelectCluster': 
      return clusterManagementPayload([]);
    case '[ClusterManager]ConfigDone': 
      return clusterManagementPayload([]);
    case '[ClusterManager]DeleteCluster': 
      return clusterManagementDelete;
    case '[UplinksManager]DiscoverUplinks': 
      return require('./payload/discover-uplinks');
  }
  
  console.log('+1', payload.actions[0].selected_option.value);
  console.log('+2', payload.actions[0].selected_option.value.includes('[r'));
  if (payload.actions[0].selected_option && payload.actions[0].selected_option.value.includes('[r')) {
    return clusterManagementDelete;
  }
}


