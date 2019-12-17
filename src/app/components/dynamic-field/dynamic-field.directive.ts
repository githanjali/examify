import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
  } from "@angular/core";

  import { Component, EventEmitter, OnChanges, Output } from "@angular/core";
  import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
  import { FieldConfig, Validator } from "../../field.interface";

  import { InputComponent } from '../input/input.component';
  import { CheckboxComponent } from '../checkbox/checkbox.component';
  import { RadioComponent } from '../radio/radio.component';
  import { SelectComponent } from '../select/select.component';
import { ButtonComponent } from '../button/button.component';

  const componentMapper = {
    input : InputComponent,
    checkbox : CheckboxComponent,
    radio : RadioComponent,
    select : SelectComponent,
    button : ButtonComponent
  }

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective{
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
componentRef: any;

  constructor(private factoryresolver: ComponentFactoryResolver,
   private   viewcontainerRef: ViewContainerRef
    
    ) { }
   

  ngOnInit() {
    const factory = this.factoryresolver.resolveComponentFactory(
      componentMapper[this.field.type]
      );
      this.componentRef = this.viewcontainerRef.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;

  }
}
