export abstract class CaptchaChallenge {
  abstract validate(): boolean;
  abstract init(existingContent:any): any;
}