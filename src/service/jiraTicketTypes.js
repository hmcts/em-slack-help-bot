class JiraType {
    static ISSUE = new JiraType('Task', 3, 281, 31, 181, 'Support request');
    static BUG = new JiraType('Bug', 10900, 281, 31, 181, 'Bug');
    static SERVICE = new JiraType('Open ID Connect Service', 17701, 51, 61, 31, 'OpenID Connect Service');
    static ROLE = new JiraType('User Role', 17702, 51, 61, 31, 'User Role');

    static jiraRequestTypeMap = new Map([
        [JiraType.ISSUE.requestType, JiraType.ISSUE],
        [JiraType.BUG.requestType, JiraType.BUG],
        [JiraType.SERVICE.requestType, JiraType.SERVICE],
        [JiraType.ROLE.requestType, JiraType.ROLE]
    ])

    constructor(name, id, startTransitionId, endTransitionId, withdrawTransitionId, requestType) {
        this.name = name
        this.id = id
        this.startTransitionId = startTransitionId
        this.endTransitionId = endTransitionId
        this.withdrawTransitionId = withdrawTransitionId
        this.requestType = requestType
    }

    static getJiraTypeFromRequestType(requestType) {
        return JiraType.jiraRequestTypeMap.get(requestType)
    }
}

module.exports.JiraType = JiraType