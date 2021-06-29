<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class ExceptionSubscriber implements EventSubscriberInterface
{
	protected $translator;
	public function __construct(TranslatorInterface $translator)
	{
		$this->translator = $translator;
	}

	public function onKernelException(ExceptionEvent $event)
	{
		$exception = $event->getThrowable();
		$response = new JsonResponse();

		if ($exception instanceof HttpExceptionInterface) {
			$data = [
				"status" => $exception->getStatusCode(),
				"message" => $this->translator->trans("data.missing")
			];
			$response->setStatusCode($exception->getStatusCode());
			$response->headers->replace($exception->getHeaders());
			$response->setData($data);
		}

		$event->setResponse($response);

	}

	public static function getSubscribedEvents(): array
	{
		return [
			"kernel.exception" => "onKernelException"
		];
	}
}