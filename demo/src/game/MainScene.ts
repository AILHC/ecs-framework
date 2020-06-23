class MainScene extends Scene {
    constructor(){
        super();

        // this.addEntityProcessor(new SpawnerSystem(new Matcher()));
        this.astarTest();
        this.dijkstraTest();
        this.breadthfirstTest();
    }

    public onStart(){
        this.content.load("http://www.hyuan.org/123.jpeg", false).then((data)=>{
            console.log(data);
        });

        this.camera.setZoom(0.5);

        let bgSprite = new Sprite(RES.getRes("bg_jpg"));
        let bg = this.createEntity("bg");
        bg.position = new Vector2(0, 0);
        bg.addComponent(new SpriteRenderer()).setSprite(bgSprite);

        for (let i = 0; i < 20; i ++){
            let sprite = new Sprite(RES.getRes("checkbox_select_disabled_png"));
            let player2 = this.createEntity("player2");
            player2.addComponent(new SpriteRenderer()).setSprite(sprite);
            player2.position = new Vector2(Math.random() * 100 * i, Math.random() * 100 * i);
            player2.addComponent(new BoxCollider());
        }

        let button = new eui.Button();
        button.label = "切换场景";
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            SceneManager.startSceneTransition(new WindTransition(()=>{
                return new MainScene();
            }));
        }, this);

        let cancel = new eui.Button();
        cancel.label = "打开高斯模糊";
        cancel.y = 100;
        this.addChild(cancel);
        cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            this.addPostProcessor(new GaussianBlurPostProcessor());
        }, this);
    }

    public breadthfirstTest(){
        let graph = new UnweightedGraph<string>();

        graph.addEdgesForNode("a", ["b"]); // a->b
        graph.addEdgesForNode("b", ["a", "c", "d"]); // b->a b->c b->d
        graph.addEdgesForNode("c", ["a"]); // c->a
        graph.addEdgesForNode("d", ["e", "a"]); // d->e d->a
        graph.addEdgesForNode("e", ["b"]); // e->b

        // 计算从c到e的路径
        let path = BreadthFirstPathfinder.search(graph, "c", "e");
        console.log(path);
    }

    public dijkstraTest(){
        let graph = new WeightedGridGraph(20, 20);

        graph.weightedNodes.push(new Point(3, 3));
        graph.weightedNodes.push(new Point(3, 4));
        graph.weightedNodes.push(new Point(4, 3));
        graph.weightedNodes.push(new Point(4, 4));

        let path = graph.search(new Point(3, 4), new Point(15, 17));
        console.log(path);
    }

    public astarTest(){
        let graph = new AstarGridGraph(20, 20);

        graph.weightedNodes.push(new Point(3, 3));
        graph.weightedNodes.push(new Point(3, 4));
        graph.weightedNodes.push(new Point(4, 3));
        graph.weightedNodes.push(new Point(4, 4));

        let path = graph.search(new Point(3, 4), new Point(15, 17));
        console.log(path);
    }
}