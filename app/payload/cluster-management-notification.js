module.exports = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Cluster Shutdown is Planned*\nYour cluster *replicantsinc-01.nebula-video* is planned for shutdown in 30 minutes.\nIf you need it please Snooze this notification."
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
          "text": "Snooze"
        },
        "options": [
            {
                "text": {
                    "type": "plain_text",
                    "text": "1 Hour"
                },
                "value": "value-0"
            },
            {
                "text": {
                    "type": "plain_text",
                    "text": "3 Hours"
                },
                "value": "value-1"
            },
            {
                "text": {
                    "type": "plain_text",
                    "text": "Tomorrow at 6 PM"
                },
                "value": "value-2"
            },
            {
                "text": {
                    "type": "plain_text",
                    "text": "1 Week"
                },
                "value": "value-3"
            }
            ,
            {
                "text": {
                    "type": "plain_text",
                    "text": "Forever"
                },
                "value": "value-4"
            }
        ]
			},

			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Delete now",
					"emoji": true
        },
        "style": "danger",
        "confirm": {
          "title": {
            "type": "plain_text",
            "text": "Are you sure?"
          },
          "text": {
              "type": "mrkdwn",
              "text": "Cluster *replicantsinc-01 would be removed now."
          },
          "confirm": {
              "type": "plain_text",
              "text": "Do it"
          },
          "deny": {
              "type": "plain_text",
              "text": "Stop, I've changed my mind!"
          },
        },
				"value": "[ClusterManager]DeleteCluster"
			},
		]
	},
]