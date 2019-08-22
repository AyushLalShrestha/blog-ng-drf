import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'tag-chips-component',
  templateUrl: 'tagchips.component.html',
  styleUrls: ['tagchips.component.css'],
})
export class TagChipsComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  // tags: string[] = ['story'];
  tagSuggestions: string[] = ['sports', 'politics', 'science', 'tech', 'entertainment'];

  // @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() parentForm: FormGroup;
  @Input() tags: string[];
  @Output() tagSelect = new EventEmitter<any>();

  constructor() {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.tagSuggestions.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagsCtrl.setValue(null);
    }
    this.tagSelect.emit(this.tags);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.tagSuggestions.push(tag);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    // this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);

    const idx = this.tagSuggestions.indexOf(event.option.viewValue);
    if (idx >= 0) {
      this.tagSuggestions.splice(idx, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // return this.tagSuggestions.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    return this.tagSuggestions.filter(tag => tag.includes(filterValue));
  }
} 
