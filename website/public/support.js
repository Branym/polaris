
document.getElementById('order_support').addEventListener('click', () => {
    $zoho.salesiq.chat.start()
    $zoho.salesiq.visitor.info({"OrderId" : "else", "Text": "No text"});
    $zoho.salesiq.visitor.customaction("Order")
})