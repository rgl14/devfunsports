let baseSite = {
  url: "http://159.8.246.2/Admin/Admin.svc",
  currency: "INR",
  bookHub: "http://159.8.244.61:11112",
  fancyHub: "http://159.8.244.61:21111",
  analyisHub: "http://159.8.244.61:11334",
};
let Hostname = window.location.hostname;
if (Hostname.indexOf("usd") > -1) {
  baseSite.url = "http://" + Hostname + "/Main/Admin.svc";
  baseSite.currency = "USD";
  baseSite.bookHub = "http://159.8.244.61:12112";
  baseSite.fancyHub = "http://159.8.244.61:22111";
  baseSite.analyisHub = "http://159.8.244.61:12334";
} else if (Hostname.indexOf("hkd") > -1) {
  baseSite.url = "http://" + Hostname + "/Main/Admin.svc";
  baseSite.currency = "HKD";
  baseSite.bookHub = "http://159.8.244.61:13112";
  baseSite.fancyHub = "http://159.8.244.61:23111";
  baseSite.analyisHub = "http://159.8.244.61:13334";
}

export const environment = {
  production: true,
  baseSite: baseSite,
};
