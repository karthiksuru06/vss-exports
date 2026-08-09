/** In-memory store (per serverless instance). Replace with a DB for persistence. */
const users = [];
const inquiries = [];
let lastUserId = 1;
let lastInquiryId = 1;

function nextUserId() {
  return lastUserId++;
}

function nextInquiryId() {
  return lastInquiryId++;
}

module.exports = {
  users,
  inquiries,
  nextUserId,
  nextInquiryId,
};
