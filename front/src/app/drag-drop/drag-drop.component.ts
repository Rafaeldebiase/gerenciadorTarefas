import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
  public todo: string[] = [];

  public done: string[] = [];

  public formulario: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.criaFormulario();
  }

  public criaFormulario(): any {
    this.formulario = this.fb.group({
      tarefa: [null, Validators.maxLength(100)]
    });
  }

  public butaoClick() {
    const limpar = '';
    this.todo.push(this.getTarefa());
    this.setTarefa(limpar);
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  private getTarefa() {
    return this.formulario.get('tarefa').value;
  }

  private setTarefa(pValue: string) {
    return this.formulario.get('tarefa').setValue(pValue);
  }
}
