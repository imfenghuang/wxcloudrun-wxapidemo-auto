window.onload = function () {
  window.reviewtext = window.document.getElementById('text')
  window.reviewbtn = window.document.getElementById('btn')
  window.reviewbtn2 = window.document.getElementById('btn2')
  window.flag = false
}
window.review = async function (flag = 1) {
  if (window.flag === false) {
    window.flag = true
    window.reviewbtn.innerText = '正在检查'
    window.reviewbtn2.innerText = '正在检查'
    const res = await window.call(flag, window.reviewtext.value)
    if (res !== false) {
      if (res.errcode === 87014) {
        window.alert('微信接口检测，该内容有安全违规问题！')
      } else if (res.errcode === 0) {
        window.alert('该内容安全！')
      } else {
        window.alert(res.errmsg)
      }
    } else {
      window.alert('网络出现问题，请打开控制台查看原因！')
    }
    window.reviewbtn.innerText = '安全检查[token]'
    window.reviewbtn2.innerText = '安全检查[云调用]'
    window.flag = false
  }
}

window.call = function (flag = 1, text) {
  return new Promise((resolve) => {
    window.fetch(`./sec${flag === 1 ? '' : '2'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: text || ''
      })
    }).then(response => response.text())
      .then(result => resolve(JSON.parse(result)))
      .catch(error => {
        console.error(error)
        resolve(false)
      })
  })
}
