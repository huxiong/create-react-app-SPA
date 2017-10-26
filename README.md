### 该项目是使用 create-react-app + react-router构建的一个单页面应用

### 起步

---
使用 create-react-app 快速构建
```
npm install create-react-app -g
create-react-app create-react-app-spa
cd create-react-app-spa
npm start
```

下载 react 路由器插件 react-router-dom

```
npm i react-router-dom --save
```

---
### 目录

略

---
### 路由

#### App.js

---

导入插件

```
import React, {
  Component
} from 'react';
```
导入路由

```
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
```
导入其他模块组件及样式

```
import Nav from "./components/Nav/Nav";
import Welcome from "./pages/Welcome";
import GoodsContainer from "./pages/GoodsContainer";
import "./App.css";
```

编写App组件

```
const navList = [{
  text: "welcome",
  url: "/welcome"
}, {
  text: "goods",
  url: "/goods"
}, {
  text: "product",
  url: "/product"
}];

class App extends Component {
  render() {
    return (
      //Router 单页面路由最外层的包裹
      //一般一个单页面应用只需要使用一次Router
      <Router>
        <div className="App">
          <div className="nav_bar">
            //导航栏组件
            <Nav list={navList}></Nav>
          </div>
          <div className="content">
            //可以理解为路由的配置信息
            //path表示此路由的地址栏名称
            //component用于配置在这个路由下显示的组件
            //exact 表示path是否需要完全匹配，不使用此属性时表示false
            <Route path="/welcome" component={Welcome}></Route>
            <Route path="/goods" component={GoodsContainer}></Route>
            <Route path="/product" component={GoodsContainer}></Route>
            <Route path="/" exact component={Welcome}></Route>
          </div>
        </div>
      </Router>
    );
  };
};
```

导出App组件

```
export default App;
```


#### Nav.js 导航栏组件

---
导入依赖

```
import React, {Component} from 'react';
import "./Nav.css";
import {NavLink} from "react-router-dom";

//prop-types插件用于对react的props的进行校验
//防止不传props或者传递非指定的props而导致的bug
//并且能够精准定位问题
import PropTypes from "prop-types";
```

Nav组件

```
class Nav extends Component { 
    static propTypes = {
        //要求传入的props中的list必须为array类型
        list: PropTypes.array
    };
    static defaultProps = {
        //当props中没有list参数时，使用此默认值
        list: []
    };
    render() {
        const list = this.props.list;
        return (
            <ul className="nav">
                //通过map()的方式渲染列表类型
                //此渲染方式必须有一个key值，否则会报错
                {
                    list.map((item,index) => {
                        return (
                            //由于是重复内容，此处将其提取为组件ListItem
                            //将ListItem需要的参数以props.item的方式进行传递
                            <ListItem item={item} key={index.toString()}></ListItem>
                        );
                    })
                }
            </ul>
        );
    };         
};
```

ListItem 组件

```
class ListItem extends Component {
    static propTypes = {
        //props校验
        //item参数需要为{url：string,item:any}的形式
        item: PropTypes.shape({
            url: PropTypes.string,
            item: PropTypes.isRequired
        })
    };
    render() {
        const item = this.props.item;
        return (
            // NavLink 与 Link功能类似，都是用于跳转到指定路由
            // 此处区别：NavLink可以使用 activeClassName 参数，为激活的路由添加样式
            // to 要跳转的路由 string | object
            <NavLink to={item.url} activeClassName="active">
                <li>{item.text}</li>
            </NavLink>
        );
    };
};
```

导出组件

```
export default Nav;
```


#### Welcome.js 

---

```
import React from 'react';

const Welcome = (props) => {
    return (
        <h1>Welcome!</h1>  
    );
};

export default Welcome;
```

#### GoodsContainer.js
添加依赖

```
import React, {
	Component
} from 'react';
import {
	Route
} from "react-router-dom";
import Goods from "./../components/Goods/Goods";
import GoodsDetail from "./../components/GoodsDetail/GoodsDetail";
```

路由配置

```
export default class GoodsContainer extends Component {
	render() {
		return (
    <div>
        //注意，exact用来表示是否完全匹配，如果某路由有二级路由，一般需要添加（个人经验）
        // /:id 路由中用来传递参数
        //在到达指定路由后，可以通过props.match.params获取参数
        <Route path="/goods" exact component={Goods}></Route>
        <Route path="/goods/detail/:id" component={GoodsDetail}></Route>
        <Route path="/product" exact component={Goods}></Route>
        <Route path="/product/detail/:id" component={GoodsDetail}></Route>
    </div>
		);
	};
};
```

#### Goods.js 产品列表组件

---


```
import React, {
    Component
} from 'react';
import {Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Goods.css";

class GoodsItem extends Component {
    /props校验
    static propTypes = {
        item: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
        })
    };
    componentWillMount() {
    };
    render() {
        const item = this.props.item;
        //获取上级路由传来的路由的名字
        //获取名字后，此路由可以以变量的形式来对应多个上级路由
        //例如goods/detail/:id   product/detail/:id
        const localPath = this.props.localPath;
        return (
            //点击后跳转到to所对应的路由
            <Link to={localPath + "/detail/" + item.id}>
                <li className="goods-item">
                    <span>{ item.name }</span>
                    <span>￥{ item.price }</span>
                    <span>剩余：{ item.amount } </span>
                </li>
            </Link>
        );
    }
};

class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    };

    componentWillMount() {
        //获取此时的路由的名字
        //传递给下级路由后，方便下级路由进行对应调整
        let pathname = this.props.location.pathname;
        let url = pathname.split("/").pop();
        console.log(url)
        this.getData(url);
    };

    getData(url) {
        //fetch获取数据
        fetch("./_mock_/"+ url +".json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    list: data
                });
            })
            .catch((error) => {
                console.log("error", error);
            })
    };
    render() {
        const list = this.state.list;
        return (
            <ul className="goods">
                {
                    list.map((item,index) => {
                        return(
                            <GoodsItem localPath={this.props.location.pathname} item={item} key={index.toString()}></GoodsItem>
                        );
                    })
                }
            </ul>
        );
    }
};

export default Goods;
```


#### GoodsDetail组件

---

```
import React, {
	Component
} from 'react';


class GoodsDetail extends Component {
	render() {
		const match = this.props.match;
		return (
			<div>这是{match.params.id}的明细</div>
		);
	};
};


export default GoodsDetail;
```
