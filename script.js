
const channels = [{
  name: "GMA",
  logo: "https://i.imgur.com/HvKsHvx.png",
  group: "PH CHANNELS",
  url: "/stream?url=https://cdn.ganbaruby23.xyz/stream/restream/gma/stream.m3u8"
}];

const videoPlayer = document.getElementById("videoPlayer");
const channelList = document.getElementById("channelList");
const searchInput = document.getElementById("search");
const groupFilter = document.getElementById("groupFilter");

function renderChannels() {
  const query = searchInput.value.toLowerCase();
  const group = groupFilter.value;
  const filtered = channels.filter(c =>
    c.name.toLowerCase().includes(query) &&
    (group === "" || c.group === group)
  );

  const groups = [...new Set(channels.map(c => c.group))];
  groupFilter.innerHTML = '<option value="">All</option>' + groups.map(g =>
    `<option value="${g}">${g}</option>`).join("");

  channelList.innerHTML = filtered.map(c => `
    <div class="channel-card" onclick="playChannel('${c.url}')">
      <img src="${c.logo}" class="channel-logo" alt="${c.name}">
      <div class="mt-2 text-center">${c.name}</div>
    </div>
  `).join("");
}

function playChannel(url) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(videoPlayer);
    hls.on(Hls.Events.MANIFEST_PARSED, () => videoPlayer.play());
  } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.src = url;
    videoPlayer.addEventListener('loadedmetadata', () => videoPlayer.play());
  } else {
    alert('Your browser does not support HLS');
  }
}

searchInput.addEventListener("input", renderChannels);
groupFilter.addEventListener("change", renderChannels);
renderChannels();
