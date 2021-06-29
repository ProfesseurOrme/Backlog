<?php


	namespace App\Updater;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

abstract class ValidatorChecker
{
	private $validator;
	private $serializer;
	private $translator;

	public function __construct(ValidatorInterface $validator, SerializerInterface $serializer, TranslatorInterface $translator)
	{
		$this->validator = $validator;
		$this->serializer = $serializer;
		$this->translator = $translator;
	}

	public function verifyData($data)
	{
		$errors = $this->validator->validate($data);

		if (count($errors) > 0) {

			$dataError = [
				"code" => Response::HTTP_BAD_REQUEST,
				"error" => $this->translator->trans("validator.error"),
			];
			$messages = [];
			foreach ($errors as $violation) {
				$messages[$violation->getPropertyPath()][] = $violation->getMessage();
			}
			$dataError["error_details"] = [
				$messages
			];

			return $dataError;
		}
		return true;
	}
}