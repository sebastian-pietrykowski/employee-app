import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from './message.service';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add be called with message', () => {
    const spy = spyOn(service, 'add');
    const message = 'There has been an error';

    service.add(message);

    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should add message', () => {
    const message = 'my message';

    service.add(message);

    expect(service.messages.length === 1);
    expect(service.messages.at(-1)).toBe(message);
  });

  it('should add message with specific text', () => {
    const message = 'my message123';

    service.add(message);

    expect(service.messages.at(-1)).toBe(message);
  });

  it('should have 0 messages on start', () => {
    const expectedLength = 0;

    const actualLength = service.messages.length;
    expect(actualLength).toBe(expectedLength);
  });

  it('should clear messages', () => {
    const messages = ['message 1', 'message 2'];
    const expectedLength = 0;

    messages.forEach((message) => service.add(message));
    service.clear();

    const actualLength = service.messages.length;
    expect(actualLength).toBe(expectedLength);
  });

  it('should have proper count after adding messages', (done: DoneFn) => {
    const messages = ['message 1', 'message 2', 'message 3'];
    const expectedCount = 3;

    messages.forEach((message) => service.add(message));

    service.count.subscribe({
      next: (actualCount) => {
        expect(actualCount).toBe(expectedCount);
        done();
      },
      error: done.fail,
    });
  });
});
