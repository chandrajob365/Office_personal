} else if (
    message.messageType === MessageTypeConstants.MESSAGE_TYPE_CLOSE_FORM
) {
    const data = { options: { controlId: message.message.controlId } };
    const conversationModeMap = chatsState.conversationModeMap;
    let conversationalMode = conversationModeMap[conversationId];
    let conversational =
        (!_.isEmpty(conversationalMode) &&
            !conversationalMode.conversational) ||
        false;
    removeControlBasedOnConversationMode(
        data,
        conversationId,
        conversational
    );
}



function removeControlBasedOnConversationMode(
    data,
    conversationId,
    conversational
) {
    if (!conversational) {
        removeFromWindow(data);
        // TODO :: Do we need to remove from local storage too ?
    } else {
        // TODO ::  remove from formInPopup and local storage
    }
}