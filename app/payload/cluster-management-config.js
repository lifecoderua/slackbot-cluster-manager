module.exports = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Cluster Configuration*\nNo cluster config found for your team. Please set it up!"
		}
	},
	{
		"type": "divider"
	},
	{
		"type": "actions",
		"elements": [
      {
        "type": "static_select",
				"placeholder": {
          "type": "plain_text",
          "text": "Select an item"
        },
        "options": [ 
          {"text": {"type": "plain_text","text": "novsdeploymentstaging-01.nebula.video"},"value": "[novsdeploymentstaging-01.nebula.video"},
          {"text": {"type": "plain_text","text": "saas-deployment-staging-test-01.nebula.video"},"value": "[saas-deployment-staging-test-01.nebula.video"},
          {"text": {"type": "plain_text","text": "vos-deploy-ngde3400-13-01.nebula.video"},"value": "[vos-deploy-ngde3400-13-01.nebula.video"},
          {"text": {"type": "plain_text","text": "replicants-white-01.nebula.video"},"value": "[replicants-white-01.nebula.video"},
          {"text": {"type": "plain_text","text": "white-walker-01.nebula.video"},"value": "[white-walker-01.nebula.video"},
          {"text": {"type": "plain_text","text": "replicantsinc-01.nebula.video"},"value": "[replicantsinc-01.nebula.video"},
          {"text": {"type": "plain_text","text": "corsica-tm2-01.nebula.video"},"value": "[corsica-tm2-01.nebula.video"},
          {"text": {"type": "plain_text","text": "hkvpurple-01.nebula.video"},"value": "[hkvpurple-01.nebula.video"},
          {"text": {"type": "plain_text","text": "2-01.nebula.video"},"value": "[2-01.nebula.video"},
          {"text": {"type": "plain_text","text": "cduval-01.nebula.video"},"value": "[cduval-01.nebula.video"},
        ]
			},

			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Test",
					"emoji": true
				},
				"value": "[ClusterManager]ConfigDone"
			},
		]
	},
]