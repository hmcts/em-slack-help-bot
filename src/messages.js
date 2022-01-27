const types = require("./service/jiraTicketTypes");
const {action, jiraView, title, textField} = require("./util/helpers");
const {convertIso8601ToEpochSeconds, extractSlackLinkFromText, convertJiraKeyToUrl} = require('./util/helpers');

function supportRequestRaised({
                                  user,
                                  summary,
                                  environment,
                                  service,
                                  userAffected,
                                  jiraId
                           }) {
    return [
        title(summary),
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                textField("*Issue type* :weight_lifter: \n Support request"),
                textField("*Status* :fire: \n Open"),
                textField(`*Reporter* :man-surfing: \n <@${user}>`),
                textField(`*Environment* :house_with_garden: \n ${environment}`),
                textField(`*Service affected* :service_dog: \n ${service}`),
                textField(`*User affected* :person_with_probing_cane: \n ${userAffected}`)
            ]
        },
        jiraView(jiraId),
        {
            "type": "divider"
        },
        action(),
        {
            "type": "divider"
        }
    ]
}

function supportRequestDetails({
                                   description,
                                   analysis,
                                   date,
                                   time
    }) {
    return [
        {
            "type": "section",
            "text": textField(`*Description* :spiral_note_pad: \n ${description}`)
        },
        {
            "type": "section",
            "text": textField(`*Analysis* :thinking_face: \n ${analysis}`)
        },
        {
            "type": "section",
            "text": textField(`*Date issue occurred* :date: \n ${date}`)
        },
        {
            "type": "section",
            "text": textField(`*Time issue occurred* :hourglass: \n ${time}`)
        }
    ]
}

function bugRaised({
                       user,
                       summary,
                       environment,
                       service,
                       impact,
                       jiraId
}) {
    return [
        title(summary),
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                textField("*Issue type* :lady_beetle: \n Bug"),
                textField("*Status* :fire: \n Open"),
                textField(`*Reporter* :man-surfing: \n <@${user}>`),
                textField(`*Environment* :house_with_garden: \n ${environment}`),
                textField(`*Service affected* :service_dog: \n ${service}`),
                textField(`*Impact to user and/or service* :muscle: \n ${impact}`)
            ]
        },
        jiraView(jiraId),
        {
            "type": "divider"
        },
        action(),
        {
            "type": "divider"
        }
    ]
}

function bugDetails({
                        description,
                        analysis,
                        steps,
                        expected,
                        actual
    }) {
    return [
        {
            "type": "section",
            "text": textField(`*Description* :spiral_note_pad: \n ${description}`)
        },
        {
            "type": "section",
            "text": textField(`*Analysis* :thinking_face: \n ${analysis}`)
        },
        {
            "type": "section",
            "text": textField(`*Steps to reproduce* :ladder: \n ${steps}`)
        },
        {
            "type": "section",
            "text": textField(`*Expected behaviour* :rainbow: \n ${expected}`)
        },
        {
            "type": "section",
            "text": textField(`*Actual behaviour* :thunder_cloud_and_rain: \n ${actual}`)
        }
    ]
}

function newServiceRequestRaised({
                                     user,
                                     summary,
                                     service,
                                     description,
                                     client_id,
                                     client_secret,
                                     key_vault,
                                     redirect_uri,
                                     jiraId
}) {
    return [
        title(summary),
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                textField("*Issue type* :service_dog: \n OpenID Connect Service"),
                textField("*Status* :fire: \n Open"),
                textField(`*Reporter* :man-surfing: \n <@${user}>`),
                textField(`*Service name* :name_badge: \n ${service}`),
                textField(`*Service description* :spiral_note_pad: \n ${description}`),
                textField(`*Service client ID* :id: \n ${client_id}`),
                textField(`*Service client secret name* :secret: \n ${client_secret}`),
                textField(`*Service Azure key vault instance* :key: \n ${key_vault}`),
                textField(`*Service redirect URIs* :hedgehog: \n ${redirect_uri}`)
            ]
        },
        jiraView(jiraId),
        {
            "type": "divider"
        },
        action(),
        {
            "type": "divider"
        }
    ]
}

function newServiceRequestDetails({
                                      self_registration,
                                      mfa,
                                      sso,
                                      admin_management,
                                      super_user,
                                      user_search,
                                      user_registration,
                                      user_management
}) {
    return [
        {
            "type": "section",
            "fields": [
                textField(`*Self-registration enabled?* :selfie: \n ${self_registration}`),
                textField(`*MFA enabled?* :nesting_dolls: \n ${mfa}`),
                textField(`*Judicial SSO enabled?* :one: \n ${sso}`),
                textField(`*Super user or admin user access for managing users required?* :superhero: \n ${admin_management}`),
                textField(`*Super user email address* :email: \n ${super_user}`),
                textField(`*User search via API enabled?* :mag: \n ${user_search}`),
                textField(`*User registration via API enabled?* :registered: \n ${user_registration}`),
                textField(`*User management via API enabled?* :man_dancing: \n ${user_management}`)
            ]
        }
    ]
}

function newRoleRequestRaised({
                                  user,
                                  summary,
                                  team,
                                  role,
                                  description,
                                  ccd_admin,
                                  prd_admin,
                                  jiraId
}) {
    return [
        title(summary),
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                textField("*Issue type* :bust_in_silhouette: \n User Role"),
                textField("*Status* :fire: \n Open"),
                textField(`*Reporter* :man-surfing: \n <@${user}>`),
                textField(`*Reporter team* :man-woman-girl-boy: \n ${team}`),
                textField(`*Role name* :name_badge: \n ${role}`),
                textField(`*Role description* :spiral_note_pad: \n ${description}`),
                textField(`*Can CCD admin users manage this role?* :firecracker: \n ${ccd_admin}`),
                textField(`*Can PRD admin users manage this role?* :balloon: \n ${prd_admin}`)
            ]
        },
        jiraView(jiraId),
        {
            "type": "divider"
        },
        action(),
        {
            "type": "divider"
        }
    ]
}

function unassignedOpenIssue({
                                 summary,
                                 slackLink,
                                 jiraId,
                                 created,
                                 updated
                             }) {
    const link = slackLink ? slackLink : convertJiraKeyToUrl(jiraId)

    return [
        {
            "type": "divider"
        },
        {
            "type": "section",
            "block_id": `${jiraId}_link`,
            "text": textField(`*<${link}|${summary}>*`)
        },
        {
            "type": "actions",
            "block_id": `${jiraId}_actions`,
            "elements": [
                {
                    "type": "users_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Assign to",
                        "emoji": true
                    },
                    "action_id": "app_home_unassigned_user_select"
                },
                {
                    "type": "button",
                    "action_id": "app_home_take_unassigned_issue",
                    "text": {
                        "type": "plain_text",
                        "text": ":raising_hand: Take it"
                    },
                    "style": "primary"
                }
            ]
        },
        {
            "type": "section",
            "block_id": `${jiraId}_fields`,
            "fields": [
                textField(`*:alarm_clock: Opened:*\n <!date^${convertIso8601ToEpochSeconds(created)}^{date_pretty} ({time})|${created}>`),
                textField(`*:hourglass: Last Updated:*\n <!date^${convertIso8601ToEpochSeconds(updated)}^{date_pretty} ({time})|${updated}>`),
                textField(`*View on Jira*:\n <${convertJiraKeyToUrl(jiraId)}|${jiraId}>`)
            ]
        },
        ]
}

function appHomeUnassignedIssues(openIssueBlocks) {
    return [
        {
            "type": "section",
            "text": textField("*Open unassigned issues*")
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Unassigned open issues",
                        "emoji": true
                    },
                    "value": "unassigned_open_issues",
                    "action_id": "unassigned_open_issues"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "My issues",
                        "emoji": true
                    },
                    "value": "my_issues",
                    "action_id": "my_issues"
                }
            ]
        },
        ...openIssueBlocks
    ]
}

function option(name, option) {
    return {
        text: {
            type: "plain_text",
            text: name,
            emoji: true
        },
        value: option ?? name.toLowerCase()
    }
}

function openHelpRequestBlocks() {
    return {
        "title": {
            "type": "plain_text",
            "text": "IDAM Support Request"
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit"
        },
        "blocks": [
            {
                "type": "input",
                "block_id": "summary",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "title",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Short description of the issue"
                    }
                },
                "label": textField("Issue summary")
            },
            {
                "type": "input",
                "block_id": "description",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "description",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Give more detail"
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "Issue description",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "analysis",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "analysis"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Analysis done so far",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "environment",
                "optional": true,
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Choose an environment",
                        "emoji": true
                    },
                    "options": [
                        option('AAT / Staging', 'staging'),
                        option('Preview / Dev', 'dev'),
                        option('Production'),
                        option('Perftest / Test', 'test'),
                        option('ITHC'),
                        option('N/A', 'none'),
                    ],
                    "action_id": "environment"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Environment",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "service",
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Choose a service. Select other if missing",
                        "emoji": true
                    },
                    "options": [
                        option('Access Management', 'am'),
                        option('Architecture'),
                        option('Bulk scan', 'bulkscan'),
                        option('Bulk print', 'bulkprint'),
                        option('CCD'),
                        option('Civil Damages', 'civildamages'),
                        option('Civil Unspecified', 'CivilUnspec'),
                        option('CMC'),
                        option('Divorce'),
                        option('Domestic Abuse', "domesticabuse"),
                        option('No fault divorce', 'nfdivorce'),
                        option('Ethos'),
                        option('Evidence Management', 'evidence'),
                        option('Expert UI', 'xui'),
                        option('FaCT'),
                        option('Financial Remedy', 'finrem'),
                        option('FPLA'),
                        option('Family Private Law', 'FPRL'),
                        option('Family Public Law', 'FPL'),
                        option('Heritage'),
                        option('HMI'),
                        option('Management Information', 'mi'),
                        option('Immigration and Asylum', 'iac'),
                        option('IDAM'),
                        option('Other'),
                        option('Probate'),
                        option('Reference Data', 'refdata'),
                        option('Reform Software Engineering', 'reform-software-engineering'),
                        option('Security Operations or Secure design', 'security'),
                        option('SSCS'),
                        option('PayBubble'),
                        option('PET'),
                        option('Work Allocation', 'workallocation'),
                    ],
                    "action_id": "service"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Service affected",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "user",
                "optional": true,
                "element": {
                    "type": "plain_text_input",
                    "action_id": "user"
                },
                "label": {
                    "type": "plain_text",
                    "text": "User affected",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "date",
                "optional": true,
                "element": {
                    "type": "plain_text_input",
                    "action_id": "date"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Date the issue occurred",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "time",
                "optional": true,
                "element": {
                    "type": "plain_text_input",
                    "action_id": "time"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Time the issue occurred",
                    "emoji": true
                }
            }
        ],
        "type": "modal",
        "callback_id": "create_help_request"
    }
}

module.exports = {
    appHomeUnassignedIssues,
    unassignedOpenIssue,
    supportRequestRaised,
    supportRequestDetails,
    bugRaised,
    bugDetails,
    newServiceRequestRaised,
    newServiceRequestDetails,
    newRoleRequestRaised,
    openHelpRequestBlocks,
    extractSlackLinkFromText
}