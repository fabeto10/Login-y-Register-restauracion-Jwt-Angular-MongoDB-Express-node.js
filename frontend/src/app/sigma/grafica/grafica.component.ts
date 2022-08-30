import { Component, OnInit } from '@angular/core';
import Graph from 'graphology';
import Sigma from 'sigma';
import ForceSupervisor from 'graphology-layout-force/worker';
import { elementAt } from 'rxjs';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent implements OnInit {
  graph: any = new Graph();
  constructor() {}
  graficarUsuario(usuario: any, x: number, y: number) {
    this.graph.addNode(usuario.id, {
      x,
      y,
      label: usuario.nombre,
      size: 10,
      color: '#03fa45',
    });
    let yAux = y - 1;
    this.graph.setNodeAttribute(usuario.id, 'data', usuario);
    usuario.hijos.forEach((hijo: any, index: number) => {
      let xAux = index % 2 ? x - 1 : x + 1;
      this.graficarUsuario(hijo, xAux, yAux);
      this.graph.addEdge(usuario.id, hijo.id);
    });
  }
  ngOnInit(): void {
    // Retrieve the html document for sigma container
    const container = document.getElementById('sigma-container') as HTMLElement;
    let usuario = {
      id: 1,
      nombre: 'Miguel Hernandez',
      color: '#435376',
      hijos: [
        {
          id: 2,
          nombre: 'Maria Hernandez',
          color: '#435776',
          hijos: [
            {
              id: 4,
              nombre: 'Hernan Dario',
              color: '#435776',
              hijos: [
                {
                  id: 7,
                  nombre: 'German Dario',
                  color: '#435776',
                  hijos: [],
                },
                {
                  id: 8,
                  nombre: 'Miguel Estrada',
                  color: '#435676',
                  hijos: [],
                },
              ],
            },
            {
              id: 5,
              nombre: 'Daniel Estrada',
              color: '#435676',
              hijos: [],
            },
          ],
        },
        {
          id: 3,
          nombre: 'Daniel Hernandez',
          color: '#435676',
          hijos: [],
        },
      ],
    };
    // const auxId = usuarios.forEach(function(element: any, index: number){
    //   // console.log(element.id);
    //   // let auxNew = element.id.sort()
    //   // console.log(auxNew)
    //   return graph.addNode(`${element.id}`, { x: -3, y: 2, size: 10, label: `${element.nombre}`,  color: `${element.color}` })
    // })
    // const auxEach = relaciones.forEach(function(element){
    //   console.log(element.origen, element.destino)
    //   return graph.addEdge(`${element.origen}`, `${element.destino}`, { size: 10} );
    // })

    // auxId;
    // console.log(auxId);
    // auxEach;
    // console.log(auxEach);
    // Create a sample graph
    this.graficarUsuario(usuario, 0, 0);
    // graph.addEdge(1, "n2");
    // graph.addEdge("n2", "n4");
    // graph.addEdge(1 , "n3");
    // graph.addEdge("n2", "n5");

    /*  graph.nodes().forEach((node, i) => {
    const angle = (i * 1 * Math.PI) / graph.order;
    graph.setNodeAttribute(node, "x", 50 * Math.cos(angle));
    graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
  });*/
    // Create the spring layout and start it
    // const layout = new ForceSupervisor(graph, { isNodeFixed: (_, attr: any) => attr.highlighted });
    // layout.start();

    // Create the sigma
    const renderer: any = new Sigma(this.graph, container);
    console.log(renderer);
    //
    // Drag'n'drop feature
    // ~~~~~~~~~~~~~~~~~~~
    //

    // State for drag'n'drop
    let draggedNode: string | null = null;
    let isDragging = false;

    // On mouse down on a node
    //  - we enable the drag mode
    //  - save in the dragged node in the state
    //  - highlight the node
    //  - disable the camera so its state is not updated
    renderer.on('downNode', (e: any) => {
      isDragging = true;
      draggedNode = e.node;
      this.graph.setNodeAttribute(draggedNode, 'highlighted', true);
    });

    // // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
    renderer.getMouseCaptor().on('mousemovebody', (e: any) => {
      if (!isDragging || !draggedNode) return;

      // Get new position of node
      const pos = renderer.viewportToGraph(e);

      this.graph.setNodeAttribute(draggedNode, 'x', pos.x);
      this.graph.setNodeAttribute(draggedNode, 'y', pos.y);

      // Prevent sigma to move camera:
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    // On mouse up, we reset the autoscale and the dragging mode
    renderer.getMouseCaptor().on('mouseup', () => {
      if (draggedNode) {
        this.graph.removeNodeAttribute(draggedNode, 'highlighted');
      }
      isDragging = false;
      draggedNode = null;
    });

    // Disable the autoscale at the first down interaction
    // renderer.getMouseCaptor().on("mousedown", () => {
    //   if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());
    // });

    //
    // Create node (and edge) by click
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //
    renderer.on(
      'clickNode',
      ({ event }: { event: { x: number; y: number } }) => {
        const closestNodes = this.graph
          .nodes()
          .map((id: any) => {
            const attrs: any = this.graph.getNodeAttributes(id);
            const coordForGraph = renderer.viewportToGraph({
              x: event.x,
              y: event.y,
            });
            const distance =
              Math.pow(coordForGraph.x - attrs.x, 2) +
              Math.pow(coordForGraph.y - attrs.y, 2);
            return { id, distance };
          })
          .sort((a: any, b: any) => a.distance - b.distance)
          .slice(0, 1);
        let usuario = this.graph.getNodeAttribute(closestNodes[0].id, 'data');
          console.log(usuario)
      }
    );
    // When clicking on the stage, we add a new node and connect it to the closest node
    /*   renderer.on("clickStage", ({ event }: { event: { x: number; y: number } }) => {
    console.log(event)
    // Sigma (ie. graph) and screen (viewport) coordinates are not the same.
    // So we need to translate the screen x & y coordinates to the graph one by calling the sigma helper `viewportToGraph`
    const coordForGraph = renderer.viewportToGraph({ x: event.x, y: event.y });
  
    // We create a new node
    const node = {
      ...coordForGraph,
      size: 10,
      color: "#abbaba",
    };
  
    // Searching the two closest nodes to auto-create an edge to it
    const closestNodes = this.graph
      .nodes()
      .map((nodeId: any) => {
        const attrs:any = this.graph.getNodeAttributes(nodeId);
        const distance = Math.pow(node.x - attrs.x, 2) + Math.pow(node.y - attrs.y, 2);
        return { nodeId, distance };
      })
      .sort((a: any, b: any) => a.distance - b.distance)
      .slice(0, 2);
  
    // //We register the new node into graphology instance
    const id = Date.now();
    this.graph.addNode(id, node);
  
    // //We create the edges
    closestNodes.forEach((e: any) => this.graph.addEdge(id, e.nodeId));
  });  */
  }
}

function size(origen: number, destino: number, size: any, arg3: number): void {
  throw new Error('Function not implemented.');
}
