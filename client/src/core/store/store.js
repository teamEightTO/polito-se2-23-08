import { makeObservable, observable, action } from "mobx";
import {
  login as loginAPI,
  fetchSelf as fetchSelfAPI,
  loginVerification as loginVerificationAPI,
  logout as logoutAPI,
} from "../API/auth";
import {
  getProposals as getProposalsAPI,
  searchProposal as searchProposalAPI,
  getReceivedApplications as getReceivedApplicationsAPI,
  getMyApplications as getMyApplicationsAPI,
  postProposals as postProposalsAPI,
  getProposal as getProposalAPI,
  getProposalsByTeacherId as getProposalsByTeacherIdAPI,
  getAllGroups as getAllGroupsAPI,
  getCoSupervisors as getCoSupervisorsAPI,
  getAllCds as getAllCdSAPI,
  getAllProgrammes as getAllProgrammesAPI,
  getExternalCoSupervisors as getExtCoSupervisorsAPI,
} from "../API/proposals";
import {
  checkApplied as checkAppliedAPI,
  createApplication as createApplicationAPI,
  getReceivedApplicationsByThesisId as getReceivedApplicationsByThesisIdAPI,
  putApplicationStatus as putApplicationStatusAPI,
  checkApplication as checkApplicationAPI,
} from "../API/applications";
import {
  getVirtualClockValue as getVirtualClockValueAPI,
  setVirtualClock as setVirtualClockAPI,
} from "../API/general";
import { toast } from "react-toastify";
export class Store {
  constructor() {
    this.time = new Date();
    this.user = {
      id: "",
      role: "",
      authenticated: false,
    };
    this.loading = false;
    makeObservable(this, {
      time: observable,
      user: observable,
      loading: observable,
      setLoading: action,
      login: action,
      setVirtualClock: action,
      getVirtualClockValue: action,
    });
  }
  async setVirtualClock(time) {
    try {
      const res = await setVirtualClockAPI(time);
      this.getVirtualClockValue();
    } catch (err) {
      toast.error("Error on login");
    }
  }

  async getVirtualClockValue() {
    try {
      const res = await getVirtualClockValueAPI();
      if (res.status === 200) {
        this.time = new Date(res.data.virtual_time);
        console.log(this.time);
      }
    } catch (err) {
      toast.error("Error on login");
    }
  }
  async login() {
    try {
      const res = await loginAPI();
      if (res.status === 200) {
        window.location.href = res.data.redirectUrl;
      } else {
      }
    } catch (err) {
      toast.error("Error on login");
    }
  }
  async logout() {
    try {
      const res = await logoutAPI();
      if (res.status === 200) {
        this.user = this.user = {
          id: "",
          type: "",
          authenticated: false,
        };
        window.location.href = "/";
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  }
  async loginVerification(token) {
    try {
      const res = await loginVerificationAPI(token);

      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      toast.error("Error on login");
    }
  }

  async fetchSelf() {
    try {
      this.getVirtualClockValue();
      const res = await fetchSelfAPI();
      if (res?.status === 200) {
        // still authenticated
        this.user = res.data.data;
        this.user.authenticated = true;
      }
      if (res?.status === 401) {
        this.logout();
      }
    } catch (err) {
      return [];
    }
  }
  async getProposals(email, password) {
    try {
      const res = await getProposalsAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getProposalsByTeacherId(email, password) {
    try {
      const res = await getProposalsByTeacherIdAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getProposalsByTeacherId(keyword) {
    try {
      const res = await getProposalsByTeacherIdAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async searchProposal(keyword) {
    try {
      const res = await searchProposalAPI(keyword);
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getReceivedApplications(email, password) {
    try {
      const res = await getReceivedApplicationsAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async createApplication(application) {
    try {
      const res = await createApplicationAPI(application);
      toast.success("Application created");
      return res.data.data;
    } catch (err) {
      toast.error("Cannot create applicaton");
      return [];
    }
  }

  async getMyApplications(email, password) {
    try {
      const res = await getMyApplicationsAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async postProposals(
    title,
    type,
    description,
    requiredKnowledge,
    notes,
    level,
    programme,
    deadline,
    status,
    keywords,
    coSupervisors
  ) {
    try {
      const res = await postProposalsAPI(
        title,
        type,
        description,
        requiredKnowledge,
        notes,
        level,
        programme,
        deadline,
        status,
        keywords,
        coSupervisors
      );
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getProposal(proposalId) {
    try {
      const res = await getProposalAPI(proposalId);
      return res.data;
    } catch (err) {
      return [];
    }
  }

  async getAllGroups() {
    try {
      const res = await getAllGroupsAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getCoSupervisors() {
    try {
      const res = await getCoSupervisorsAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getExternalCoSupervisors() {
    try {
      const res = await getExtCoSupervisorsAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getAllCds() {
    try {
      const res = await getAllCdSAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async getAllProgrammes() {
    try {
      const res = await getAllProgrammesAPI();
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async checkApplied(thesisId) {
    try {
      const res = await checkAppliedAPI(thesisId);
      return res.data.applied;
    } catch (err) {
      return [];
    }
  }

  async getReceivedApplicationsByThesisId(proposalId) {
    try {
      const res = await getReceivedApplicationsByThesisIdAPI(proposalId);
      return res.data.data;
    } catch (err) {
      return [];
    }
  }

  async applicationDecision(proposalId, status) {
    try {
      const res = await putApplicationStatusAPI(proposalId, status);
      return res.data.data;
    }
    catch(err){
      console.log(err);
      return [];
    }
  }


  async checkApplication(thesisId) {
    try {
      const res = await checkApplicationAPI(thesisId);
      return res.data;
    } catch (err) {
      return [];
    }
  }

  setLoading(state) {}
}
export default new Store();
