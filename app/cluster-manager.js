const clusterManagementPayload = require('./payload/cluster-management-config');
const clusterManagementNotification = require('./payload/cluster-management-notification');
const clusterManagementDelete = require('./payload/cluster-management-delete');
const Stacks = require('./stacks');
const Store = require('./store');
const UserInfo = require('./userinfo');
const Timer = require('./timer');


module.exports = async function handleSlackPayload(payload) {
  if (payload.actions[0].value === '[ClusterManager]SelectCluster') {
    console.log('WUT::::', clusterManagementPayload(Stacks.getStackDomainOptions()));
    return clusterManagementPayload(Stacks.getStackDomainOptions());
  }
  console.log('OUT______________::::');
  
  if (payload.actions[0].type === 'static_select') {
    // ...
    // if ()
    const [, action, value] = payload.actions[0].selected_option.value.match(/\[\b(.*)\b\](.*)/i);

    switch(action) {
      case 'CM.SelectCluster':
        console.log('RESULT!!::', value);
        const user = await UserInfo.getUserInfo(payload.user.id);
        const checkHour = 19;
        const plannedCheckTime = Timer.nextClusterCheckTimestamp(checkHour, user.tz)
        Store.update(payload.channel.id, {
          clusterDns: value,
          checkHour,
          configuredBy: { 
            userId: user.id,
            userName: user.name,
          },
          clusterCheckTime: plannedCheckTime.nextCheckTimestamp,
          clusterTerminationTime: plannedCheckTime.nextTerminationTimestamp,
          timeZone: user.tz,
        });
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


