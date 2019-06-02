module.exports = (clusterDomainOptions) => [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Select Cluster for Uplink Discovery*"
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
				options: clusterDomainOptions
			},
		]
	},
]