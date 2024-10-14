const MelipayamakApi = require('melipayamak')

const username = '09224289801';
const password = '6371';
const api = new MelipayamakApi(username, password);
const from = '50004000899801';
const sms = api.sms('rest', 'sync');
const contact = api.contacts();

const sendSMS = async (to, text) => {
    try {
        const result = await sms.send(to, from, text);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

const addToContacts = async (firstName, phoneNumber, email) => {
    var date = new Date;
    try {
        const result = await contact.add({
            GroupIds: "626478",
            FirstName: firstName,
            LastName: "ss",
            NickName: "ss",
            Corporation: "ss",
            MobileNumber: phoneNumber,
            Phone: "0922",
            Fax: "0922",
            birthdate: date.toISOString(),
            Email: email,
            Gender: 2,
            Province: 2,
            City: 2,
            Address: "2",
            PostalCode: "2",
            AdditionalDate: "MaxValue",
            AdditionalText: "a",
            Descriptions: "a"
        });
        console.log(result + "****************************************************************");
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    sendSMS,
    addToContacts
};