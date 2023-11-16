import { client } from "./api";

export const getProposals = async () => {
  try {
    const res = await client.get("thesis-proposals");
    return res;
  } catch (err) {
    throw err;
  }
};

export const getReceivedApplications = async () => {
  try {
    const res = await client.get("/received-applications");
    return res;
  } catch (err) {
    throw err;
  }
};

export const searchProposal = async () => {
  try {
    const res = await client.get("/thesis-proposals/search");
    return res;
  } catch (err) {
    throw err;
  }
};

export const postProposals = async () => {
  try {
    const res = await client.post("/thesis-proposals");
    return res;
  } catch (err) {
    throw err;
  }
};

export const getProposal = async () => {
  try {
    const res = await client.get("thesis-proposals/:proposalId");
    return res;
  } catch (err) {
    throw err;
  }
};