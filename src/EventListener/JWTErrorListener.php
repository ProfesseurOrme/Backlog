<?php


namespace App\EventListener;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTFailureEventInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\Translation\TranslatorInterface;

class JWTErrorListener
{
	protected $translation;

	public function __construct(TranslatorInterface $translation)
	{
		$this->translation = $translation;
	}

	public function onJWTError(JWTFailureEventInterface $failureEvent)
	{
		$response = $failureEvent->getResponse();

		$dataResponse = [];

		if($failureEvent instanceof JWTExpiredEvent)
		{
			$dataResponse = [
				"status"  => $response->getStatusCode(),
				"message" => $this->translation->trans("token.expired")
			];
		}
		else if ($failureEvent instanceof JWTNotFoundEvent)
		{

			$dataResponse = [
				"status"  => $response->getStatusCode(),
				"message" => $this->translation->trans("token.missing")
			];

		}
		else if($failureEvent instanceof JWTInvalidEvent)
		{
			$dataResponse = [
				"status"  => $response->getStatusCode(),
				"message" => $this->translation->trans("token.invalid"),
			];
		}

		$response = new JsonResponse($dataResponse, $dataResponse["status"]);

		$failureEvent->setResponse($response);
	}
}